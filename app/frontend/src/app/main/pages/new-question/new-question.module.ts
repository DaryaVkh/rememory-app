import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ImageComponent } from '../../../components/image/image.component';
import { LoaderModule } from '../../../components/loader/loader.module';
import { NewQuestionRoutingModule } from './new-question-routing.module';
import { NewQuestionComponent } from './new-question.component';

@NgModule({
    declarations: [NewQuestionComponent],
    imports: [
        CommonModule,
        NewQuestionRoutingModule,
        NzLayoutModule,
        LoaderModule,
        NzButtonModule,
        NzMenuModule,
        NzListModule,
        NzCheckboxModule,
        NzModalModule,
        NzInputModule,
        FormsModule,
        ImageComponent,
        NzIconModule,
    ],
})
export class NewQuestionModule {}
