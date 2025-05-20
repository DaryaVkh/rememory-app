import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { HeaderComponent } from '../components/header/header.component';
import { LoaderModule } from '../components/loader/loader.module';
import { SvgIconComponent } from '../components/svg-icon/svg-icon.component';
import { AuthPageRoutingModule } from './auth-page-routing.module';
import { AuthPageComponent } from './auth-page.component';

@NgModule({
    declarations: [AuthPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        NzLayoutModule,
        NzPageHeaderModule,
        AuthPageRoutingModule,
        NzIconModule,
        NzButtonModule,
        SvgIconComponent,
        LoaderModule,
        HeaderComponent,
    ],
})
export class AuthPageModule {}
