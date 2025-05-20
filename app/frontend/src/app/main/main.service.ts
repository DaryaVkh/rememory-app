import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { UserDto } from '../../api/api.models';
import { ApiService } from '../../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class MainService {
    readonly user$: Observable<UserDto>;

    constructor(private readonly apiService: ApiService) {
        this.user$ = apiService.getCurrentUser().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
}
