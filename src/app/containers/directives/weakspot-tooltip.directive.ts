import { CapitalizePipe } from '../pipes/capitalize.pipe';
import {
    Directive,
    ElementRef,
    HostListener,
    inject,
    input,
} from '@angular/core';

@Directive({
    selector: '[weakspotTooltip]',
    providers: [CapitalizePipe],
})
export class WeakspotTooltipDirective {
    name = input('', {
        transform: (name: string) => {
            return this.capitalizePipe.transform(name);
        },
    });

    @HostListener('mouseenter')
    onMouseEnter() {
        const {
            top,
            left,
        }: {
            left: number;
            top: number;
        } = this.elementRef.nativeElement.getBoundingClientRect();

        this._createTooltip(left, top);
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this._removeTooltip();
    }

    private _tooltipId = 'tooltip';

    private capitalizePipe = inject(CapitalizePipe);
    private elementRef = inject(ElementRef);

    private _createTooltip(x: number, y: number) {
        const tooltip = document.createElement('div');

        tooltip.innerHTML = `${this.name()}`;
        tooltip.setAttribute('class', 'tooltip');
        tooltip.style.left = `${x - 30}px`;
        tooltip.style.top = `${y - 80}px`;

        tooltip.id = this._tooltipId;

        document.body.appendChild(tooltip);
    }

    private _removeTooltip() {
        const tooltip = document.getElementById(this._tooltipId);
        tooltip?.remove();
    }
}
