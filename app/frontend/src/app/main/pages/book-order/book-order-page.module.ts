import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ImageComponent } from '../../../components/image/image.component';
import { LoaderModule } from '../../../components/loader/loader.module';
import { BookOrderFormComponent } from './book-order-form/book-order-form.component';
import { BookOrderPageRoutingModule } from './book-order-page-routing.module';
import { BookOrderPageComponent } from './book-order-page.component';

@NgModule({
    declarations: [BookOrderPageComponent, BookOrderFormComponent],
    imports: [
        CommonModule,
        NzLayoutModule,
        BookOrderPageRoutingModule,
        ImageComponent,
        NzWaveModule,
        NzButtonModule,
        NzIconModule,
        NzModalModule,
        NzInputModule,
        ReactiveFormsModule,
        NzToolTipModule,
        NzNotificationModule,
        LoaderModule,
    ],
})
export class BookOrderPageModule {}
