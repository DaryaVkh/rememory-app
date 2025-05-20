import { ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { BehaviorSubject, Subject, take, takeUntil, tap } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { CLIENT_ID } from './auth-page.models';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent implements OnInit, OnDestroy {
    @ViewChild('googleButton', { static: true }) googleButtonRef!: ElementRef<HTMLElement>;

    readonly loading$ = new BehaviorSubject<boolean>(false);

    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly router: Router,
        private readonly ngZone: NgZone,
        private readonly apiService: ApiService
    ) {}

    ngOnInit(): void {
        window.onGoogleLibraryLoad = () => {
            // @ts-ignore
            google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: this.handleCredentialResponse.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true,
            });
            // @ts-ignore
            google.accounts.id.renderButton(this.googleButtonRef.nativeElement, {
                theme: 'outline',
                size: 'large',
                shape: 'pill',
            });
            // @ts-ignore
            google.accounts.id.prompt();
        };
    }

    async handleCredentialResponse(response: CredentialResponse) {
        await this.apiService
            .login(response.credential)
            .pipe(
                tap(() => this.loading$.next(true)),
                take(1),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.ngZone.run(() => {
                    return this.router.navigate(['app', 'general']).then();
                });
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
