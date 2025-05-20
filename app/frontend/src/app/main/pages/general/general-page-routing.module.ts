import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralPageComponent } from './general-page.component';

const routes: Routes = [
    {
        path: '',
        component: GeneralPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GeneralPageRoutingModule {}
