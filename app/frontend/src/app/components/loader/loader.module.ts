import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { LoaderDirective } from './loader.directive';

@NgModule({
    declarations: [LoaderComponent, LoaderDirective],
    imports: [CommonModule],
    exports: [LoaderComponent, LoaderDirective],
})
export class LoaderModule {}
