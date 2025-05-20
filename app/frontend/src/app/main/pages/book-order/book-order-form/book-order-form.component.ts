import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Subject, switchMap, take, takeUntil } from 'rxjs';
import { ApiService } from '../../../../../api/api.service';
import { MainService } from '../../../main.service';

@Component({
    selector: 'app-book-order-form',
    templateUrl: './book-order-form.component.html',
    styleUrls: ['./book-order-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookOrderFormComponent implements OnDestroy {
    readonly form = this.fb.group({
        region: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        district: this.fb.control('', { nonNullable: true }),
        town: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        street: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        house: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        building: this.fb.control('', { nonNullable: true }),
        flat: this.fb.control(0, { nonNullable: true, validators: [Validators.required] }),
    });

    readonly loading$ = new BehaviorSubject<boolean>(true);

    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly location: Location,
        private readonly router: Router,
        private readonly fb: FormBuilder,
        private readonly apiService: ApiService,
        private readonly mainService: MainService,
        private readonly notification: NzNotificationService
    ) {
        mainService.user$
            .pipe(
                switchMap((user) => apiService.getAddressSettings(user.id)),
                take(1),
                takeUntil(this.destroy$)
            )
            .subscribe((addressSettings) => {
                this.form.patchValue(addressSettings);
                this.loading$.next(false);
            });
    }

    back(def: string): void {
        if (history.length > 1 && history.state.innerRouting) {
            this.location.back();
        } else {
            this.router.navigateByUrl(def, { replaceUrl: true }).then();
        }
    }

    orderBook(): void {
        this.loading$.next(true);
        this.mainService.user$
            .pipe(
                switchMap((user) =>
                    this.apiService
                        .setAddressSettings(user.id, this.form.value)
                        .pipe(switchMap(() => this.apiService.sendRequestToCreateBook(user.id)))
                ),
                take(1),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.notification.create('success', 'Ваша книга успешно оформлена', '', { nzPlacement: 'bottomRight' });
                this.back('/app/book-order');
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
