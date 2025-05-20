import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ACCESS_TOKEN_COOKIE_NAME } from '../common/constants';
import { DecodedJwtToken } from '../common/interfaces';

@Injectable({
    providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly cookieService: CookieService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const accessToken = this.cookieService.get(ACCESS_TOKEN_COOKIE_NAME);
        if (accessToken && (jwtDecode(accessToken) as DecodedJwtToken).exp * 1000 > Date.now()) {
            return this.router.createUrlTree(['/app/general']);
        }
        return true;
    }
}
