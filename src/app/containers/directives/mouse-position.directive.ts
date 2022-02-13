import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[mousePosition]'
})
export class MousePositionDirective {
    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        console.log(event.clientX, event.clientY);
    }
}