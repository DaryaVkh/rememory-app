import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookOrderFormComponent } from './book-order-form/book-order-form.component';
import { BookOrderPageComponent } from './book-order-page.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: BookOrderPageComponent,
    },
    {
        path: 'form',
        pathMatch: 'full',
        component: BookOrderFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookOrderPageRoutingModule {}
