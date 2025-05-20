import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'general',
                loadChildren: () => import('./pages/general/general-page.module').then((m) => m.GeneralPageModule),
            },
            {
                path: 'new-question',
                loadChildren: () => import('./pages/new-question/new-question.module').then((m) => m.NewQuestionModule),
            },
            {
                path: 'book-order',
                loadChildren: () =>
                    import('./pages/book-order/book-order-page.module').then((m) => m.BookOrderPageModule),
            },
            {
                path: 'admin',
                loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'general',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
