import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-svg-icon',
    templateUrl: './svg-icon.component.html',
    styleUrls: ['./svg-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
})
export class SvgIconComponent {
    @HostBinding('attr.role') role = 'img';

    @Input() icon!: string;

    spriteIconsPath = '/assets/icons/sprite.svg';
}
