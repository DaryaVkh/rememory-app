import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-image',
    templateUrl: './image.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
})
export class ImageComponent {
    @HostBinding('class.flex-center') flexCenter = true;
    @HostBinding('style.pointer-events') pointerEvents = 'none';
    @HostBinding('style.user-select') userSelect = 'none';
    @HostBinding('style.width') @Input() width = 'auto';
    @HostBinding('style.height') @Input() height = 'auto';
    @Input() alt!: string;
    @Input() imageName!: string;
}
