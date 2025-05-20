import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { map, Observable } from 'rxjs';
import { MainService } from './main/main.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanLoad {
    constructor(private readonly mainService: MainService) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return this.mainService.user$.pipe(map(() => true));
    }
}
