import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-book-order-page',
    templateUrl: './book-order-page.component.html',
    styleUrls: ['./book-order-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookOrderPageComponent {
    constructor(
        private readonly modalService: NzModalService,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}

    openConfirmModal(): void {
        this.modalService.confirm({
            nzTitle: 'Вы уверены, что закончили писать книгу и хотите получить ее в готовом виде на почту?',
            nzCentered: true,
            nzOkText: 'Да, хочу получить книгу!',
            nzCancelText: 'Отменить',
            nzOnOk: () => this.router.navigate(['form'], { relativeTo: this.route }),
        });
    }
}
