import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '../app/common/constants';
import { DecodedJwtToken } from '../app/common/interfaces';
import ApiHelperService from './api-helper.service';
import { HttpOptions, TokensDto } from './api.models';

@Injectable({
    providedIn: 'root',
})
export class GatewayClientService {
    constructor(
        private readonly http: HttpClient,
        private readonly ngZone: NgZone,
        private readonly router: Router,
        private readonly apiHelper: ApiHelperService,
        private readonly cookieService: CookieService,
        @Inject(DOCUMENT) private readonly document: Document
    ) {}

    get<T>(commandUrl: string, options?: HttpOptions): Observable<T> {
        const request: (accessToken?: string) => Observable<HttpResponse<T>> = (accessToken?: string) =>
            this.http.get<T>(commandUrl, {
                ...options,
                observe: 'response',
                headers: this.apiHelper.getTransformHeaders(options, accessToken),
            });

        return this.getRequest(request);
    }

    post<T>(commandUrl: string, body?: any | null, options?: HttpOptions): Observable<T> {
        const request: (accessToken?: string) => Observable<HttpResponse<T>> = (accessToken?: string) =>
            this.http.post<T>(commandUrl, body, {
                ...options,
                observe: 'response',
                headers: this.apiHelper.getTransformHeaders(options, accessToken),
            });

        return this.getRequest(request);
    }

    patch<T>(commandUrl: string, body: any | null, options?: HttpOptions): Observable<T> {
        const request: (accessToken?: string) => Observable<HttpResponse<T>> = (accessToken?: string) =>
            this.http.patch<T>(commandUrl, body, {
                ...options,
                observe: 'response',
                headers: this.apiHelper.getTransformHeaders(options, accessToken),
            });

        return this.getRequest(request);
    }

    login(idToken: string): Observable<TokensDto> {
        return this.http
            .post<TokensDto>(
                '/api/auth/login',
                { idToken },
                {
                    observe: 'response',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                }
            )
            .pipe(
                catchError(() => of(null)),
                filter((response): response is HttpResponse<TokensDto> => !!response),
                map((response) => ApiHelperService.getHandledResponse(response)),
                tap((tokensDto) => {
                    this.cookieService.set(ACCESS_TOKEN_COOKIE_NAME, tokensDto.accessToken, 10, '/');
                    this.cookieService.set(REFRESH_TOKEN_COOKIE_NAME, tokensDto.refreshToken, 10, '/');
                })
            );
    }

    private getRequest<T>(request: (accessToken?: string) => Observable<HttpResponse<T>>): Observable<T> {
        const accessToken = this.cookieService.get(ACCESS_TOKEN_COOKIE_NAME);

        if (!accessToken) {
            this.ngZone.run(() => this.router.navigate(['auth']).then(() => this.document.location.reload()));
        }

        if ((jwtDecode(accessToken) as DecodedJwtToken).exp * 1000 > Date.now()) {
            return request().pipe(
                catchError((response) => {
                    if (response.statusCode === 401) {
                        this.document.location.reload();
                    }
                    return of(null);
                }),
                filter((response): response is HttpResponse<T> => !!response),
                map((response) => ApiHelperService.getHandledResponse(response))
            );
        }

        return this.refreshToken().pipe(
            switchMap((result) => (result ? request(result.accessToken) : of(null))),
            filter((response): response is HttpResponse<T> => !!response),
            map((response) => ApiHelperService.getHandledResponse(response))
        );
    }

    private refreshToken<T>(): Observable<TokensDto | null> {
        return this.http
            .post<TokensDto>('/api/auth/refresh', this.apiHelper.getTokens(), {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .pipe(
                catchError(() => {
                    const location = this.document.location;
                    this.cookieService.delete(ACCESS_TOKEN_COOKIE_NAME, '/');
                    this.cookieService.delete(REFRESH_TOKEN_COOKIE_NAME, '/');
                    this.ngZone.run(() => this.router.navigate(['auth']).then(() => location.reload()));
                    return of(null);
                }),
                tap((tokensDto: TokensDto | null) => {
                    if (tokensDto) {
                        this.cookieService.set(ACCESS_TOKEN_COOKIE_NAME, tokensDto.accessToken, 10, '/');
                        this.cookieService.set(REFRESH_TOKEN_COOKIE_NAME, tokensDto.refreshToken, 10, '/');
                    }
                })
            );
    }
}
