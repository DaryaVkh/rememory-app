import { ComponentRef, Directive, ElementRef, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { LoaderComponent } from './loader.component';

@Directive({
    selector: '[appLoader]',
})
export class LoaderDirective {
    private componentRef?: ComponentRef<LoaderComponent>;

    @Input()
    set appLoader(loading: boolean | null) {
        this.componentRef?.destroy();
        if (loading) {
            this.componentRef = this.viewContainerRef.createComponent(LoaderComponent);
            this.renderer.appendChild(this.elementRef.nativeElement, this.componentRef.location.nativeElement);
        }
    }

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        private readonly viewContainerRef: ViewContainerRef
    ) {}
}
