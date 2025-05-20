import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ModalButtonOptions, NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { BehaviorSubject, skip, Subject, takeUntil } from 'rxjs';
import { NotificationSettingsDto } from '../../../api/api.models';
import { LoaderModule } from '../loader/loader.module';
import { SETTINGS_MODAL_PERIOD_OPTIONS } from './settings-modal.models';

@Component({
    selector: 'app-settings-modal',
    standalone: true,
    templateUrl: './settings-modal.component.html',
    styleUrls: ['./settings-modal.component.scss'],
    imports: [
        CommonModule,
        NzModalModule,
        ReactiveFormsModule,
        NzSelectModule,
        NzSwitchModule,
        FormsModule,
        NzButtonModule,
        NzIconModule,
        NzInputModule,
        LoaderModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsModalComponent implements OnInit, OnDestroy {
    @Input() settings!: NotificationSettingsDto;
    @Input() isSettingsModalOpen$ = new BehaviorSubject<boolean>(false);

    @Output() saveSettings = new EventEmitter<NotificationSettingsDto>();

    readonly settingsForm = this.fb.group({
        periodInDays: 0,
        email: [
            '',
            [
                Validators.pattern(
                    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                ),
            ],
        ],
        telegramName: ['', [Validators.minLength(5), Validators.maxLength(32), Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
    });
    readonly modalFooter: ModalButtonOptions[] = [
        {
            label: 'Сохранить',
            size: 'large',
            type: 'primary',
            onClick: () => {
                if (this.settingsForm.valid) {
                    this.saveSettings.emit({
                        email: this.settingsForm.controls.email.value ?? undefined,
                        telegramName: this.settingsForm.controls.telegramName.value
                            ? `@${this.settingsForm.controls.telegramName.value}`
                            : undefined,
                        periodInDays: this.settingsForm.controls.periodInDays.value ?? 0,
                    });
                }
            },
        },
    ];
    readonly periodOptions = SETTINGS_MODAL_PERIOD_OPTIONS;

    readonly hasNotificationEmail$ = new BehaviorSubject<boolean>(false);
    readonly hasNotificationTelegram$ = new BehaviorSubject<boolean>(false);

    private readonly destroy$ = new Subject<void>();

    constructor(private readonly fb: FormBuilder) {
        this.hasNotificationEmail$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((hasNotificationEmail) => {
            if (!hasNotificationEmail) {
                this.settingsForm.controls.email.setValue('');
            }
        });
        this.hasNotificationTelegram$.pipe(skip(1), takeUntil(this.destroy$)).subscribe((hasNotificationTelegram) => {
            if (!hasNotificationTelegram) {
                this.settingsForm.controls.telegramName.setValue('');
            }
        });
    }

    ngOnInit(): void {
        this.settingsForm.patchValue({
            ...this.settings,
            telegramName: this.settings.telegramName?.slice(1),
        });
        this.hasNotificationEmail$.next(!!this.settings.email);
        this.hasNotificationTelegram$.next(!!this.settings.telegramName);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
