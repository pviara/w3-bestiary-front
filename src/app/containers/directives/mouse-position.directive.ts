import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

class MousePosition {
    constructor(
        readonly x: number,
        readonly y: number
    ) {}
}

@Directive({
    selector: '[mousePosition]'
})
export class MousePositionDirective {
    @Output()
    changeMousePosition: EventEmitter<MousePosition> = new EventEmitter();

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.changeMousePosition.emit(
            new MousePosition(event.clientX, event.clientY)
        );
    }
}