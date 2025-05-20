import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralPageComponent } from './general-page.component';
import { GeneralPageRoutingModule } from './general-page-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { SvgIconComponent } from '../../../components/svg-icon/svg-icon.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { LoaderModule } from '../../../components/loader/loader.module';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ImageComponent } from '../../../components/image/image.component';

@NgModule({
    declarations: [GeneralPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        GeneralPageRoutingModule,
        NzLayoutModule,
        NzPageHeaderModule,
        SvgIconComponent,
        NzAvatarModule,
        NzButtonModule,
        NzInputModule,
        NzIconModule,
        NzMenuModule,
        AngularEditorModule,
        NzCheckboxModule,
        LoaderModule,
        NzNotificationModule,
        ImageComponent,
    ],
})
export class GeneralPageModule {}
