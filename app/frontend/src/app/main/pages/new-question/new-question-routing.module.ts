import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewQuestionComponent } from './new-question.component';

const routes: Routes = [
    {
        path: '',
        component: NewQuestionComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewQuestionRoutingModule {}
