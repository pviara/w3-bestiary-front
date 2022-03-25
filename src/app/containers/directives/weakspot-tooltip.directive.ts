import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector: '[weakspotTooltip]'
})
export class WeakspotTooltipDirective {
    @Input()
    name: string | null | undefined;
    
    constructor(
        private elementRef: ElementRef
    ) {}

    ngOnChanges() {
        console.log(this.name);
    }
}