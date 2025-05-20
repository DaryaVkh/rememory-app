import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { SvgIconComponent } from '../components/svg-icon/svg-icon.component';
import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from '../components/header/header.component';

@NgModule({
    declarations: [MainComponent],
    imports: [CommonModule, NzPageHeaderModule, SvgIconComponent, MainRoutingModule, HeaderComponent],
})
export class MainModule {}
