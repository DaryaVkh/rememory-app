import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
    BehaviorSubject,
    combineLatest,
    map,
    Observable,
    of,
    shareReplay,
    startWith,
    Subject,
    switchMap,
    take,
    takeUntil,
    tap,
} from 'rxjs';
import { CategoryDto, GlobalQuestionDto, UserDto } from '../../../../api/api.models';
import { ApiService } from '../../../../api/api.service';
import { MainService } from '../../main.service';

@Component({
    selector: 'app-new-question',
    templateUrl: './new-question.component.html',
    styleUrls: ['./new-question.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewQuestionComponent implements OnDestroy {
    questionsToAdd: string[] = [];
    newQuestion = '';

    readonly user$: Observable<UserDto>;
    readonly categories$: Observable<CategoryDto[]>;
    readonly questions$: Observable<GlobalQuestionDto[]>;
    readonly activeCategory$ = new BehaviorSubject<CategoryDto | null>(null);
    readonly loading$ = new BehaviorSubject<boolean>(true);
    readonly isModalOpen$ = new BehaviorSubject<boolean>(false);

    private readonly update$ = new Subject<void>();
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly apiService: ApiService,
        private readonly mainService: MainService
    ) {
        this.user$ = mainService.user$;

        this.categories$ = apiService.getAllCategories().pipe(
            map((categoriesDto) => categoriesDto.categories.filter((category) => category.name !== 'Свои вопросы')),
            tap(() => this.loading$.next(false)),
            shareReplay({ bufferSize: 1, refCount: true })
        );

        this.questions$ = this.update$.pipe(
            startWith([]),
            switchMap(() => combineLatest([this.user$, this.activeCategory$])),
            switchMap(([user, activeCategory]) =>
                activeCategory
                    ? apiService.getGlobalQuestions(user.id, [activeCategory.id])
                    : of({ globalQuestions: [] })
            ),
            map((questionsDto) => questionsDto.globalQuestions),
            tap(() => this.loading$.next(false)),
            shareReplay({ bufferSize: 1, refCount: true })
        );
    }

    isQuestionChecked(id: string): boolean {
        return this.questionsToAdd.includes(id);
    }

    changeCheckedQuestions(checked: boolean, id: string): void {
        if (checked) {
            this.questionsToAdd.push(id);
        } else {
            this.questionsToAdd = this.questionsToAdd.filter((questionId) => questionId !== id);
        }
    }

    addToUserQuestions(): void {
        if (this.questionsToAdd.length) {
            this.user$
                .pipe(
                    tap(() => this.loading$.next(true)),
                    switchMap((user) => this.apiService.getNewQuestion(user.id, this.questionsToAdd)),
                    take(1),
                    takeUntil(this.destroy$)
                )
                .subscribe(() => {
                    this.questionsToAdd = [];
                    this.activeCategory$.next(null);
                    this.update$.next();
                });
        }
    }

    addNewQuestion(): void {
        if (this.newQuestion) {
            this.user$
                .pipe(
                    tap(() => this.loading$.next(true)),
                    switchMap((user) => this.apiService.createNewQuestion(user.id, this.newQuestion)),
                    take(1),
                    takeUntil(this.destroy$)
                )
                .subscribe(() => {
                    this.closeNewQuestionModal();
                    this.loading$.next(false);
                });
        } else {
            this.closeNewQuestionModal();
        }
    }

    closeNewQuestionModal(): void {
        this.newQuestion = '';
        this.isModalOpen$.next(false);
    }

    changeActiveCategory(category: CategoryDto): void {
        this.loading$.next(true);
        this.activeCategory$.next(category);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
