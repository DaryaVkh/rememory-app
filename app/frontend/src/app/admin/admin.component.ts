import { BehaviorSubject, map, Observable, shareReplay, Subject, take, takeUntil } from 'rxjs';
import { CategoryDto } from '../../api/api.models';
import { ApiService } from '../../api/api.service';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnDestroy {
    protected newQuestion = '';
    protected selectedCategory: CategoryDto | null = null;

    protected readonly loading$ = new BehaviorSubject<boolean>(false);
    protected readonly categories$: Observable<CategoryDto[]>;

    private readonly destroy$ = new Subject<void>();

    constructor(private readonly apiService: ApiService) {
        this.categories$ = apiService.getAllCategories().pipe(
            map((categoriesDto) => categoriesDto.categories.filter((category) => category.name !== 'Свои вопросы')),
            shareReplay({ bufferSize: 1, refCount: true })
        );
    }

    addNewQuestion(): void {
        const title = this.newQuestion.trim();
        if (title && this.selectedCategory) {
            this.loading$.next(true);
            this.apiService
                .createNewGlobalQuestion(title, this.selectedCategory.id)
                .pipe(take(1), takeUntil(this.destroy$))
                .subscribe(() => {
                    this.newQuestion = '';
                    this.selectedCategory = null;
                    this.loading$.next(false);
                });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
