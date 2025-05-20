import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../../api/api.models';
import { MainService } from './main.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
    readonly user$: Observable<UserDto>;

    constructor(private readonly mainService: MainService) {
        this.user$ = mainService.user$;
    }
}
