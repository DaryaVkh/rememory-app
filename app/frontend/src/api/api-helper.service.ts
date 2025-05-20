import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '../app/common/constants';
import { AppHttpHeaders, HttpOptions } from './api.models';

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: Record<string, any>;
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }
}

@Injectable({
    providedIn: 'root',
})
export default class ApiHelperService {
    constructor(private readonly cookieService: CookieService) {}

    getTokens(): string {
        return JSON.stringify({
            accessToken: this.cookieService.get(ACCESS_TOKEN_COOKIE_NAME),
            refreshToken: this.cookieService.get(REFRESH_TOKEN_COOKIE_NAME),
        });
    }

    getTransformHeaders(options?: HttpOptions, accessToken?: string): AppHttpHeaders {
        const defaultHeaders = {
            Authorization: `Bearer ${accessToken ?? this.cookieService.get(ACCESS_TOKEN_COOKIE_NAME)}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };

        return options ? { ...options.headers, ...defaultHeaders } : defaultHeaders;
    }

    static throwException(
        message: string,
        status: number,
        response: string,
        headers: Record<string, any>,
        result?: any
    ): any {
        if (result != null) {
            throw result;
        } else {
            throw new ApiException(message, status, response, headers, null);
        }
    }

    static getHandledResponse<T>(response: HttpResponse<T>): T {
        const status = response.status;
        if (status === 200 || status === 204) {
            return response.body as T;
        }
        return this.throwException(`${response?.body}`, status, `${response?.body}`, response.headers);
    }
}
