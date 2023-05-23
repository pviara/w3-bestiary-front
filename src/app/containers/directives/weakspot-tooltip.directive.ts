import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[weakspotTooltip]',
    providers: [CapitalizePipe],
})
export class WeakspotTooltipDirective {
    @Input()
    name: string | null | undefined;

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

    constructor(
        private capitalizePipe: CapitalizePipe,
        private elementRef: ElementRef,
    ) {}

    ngOnChanges() {
        if (this.name) {
            this.name = this.capitalizePipe.transform(this.name);
        }
    }

    private _createTooltip(x: number, y: number) {
        const tooltip = document.createElement('div');

        tooltip.innerHTML = `${this.name}`;
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
