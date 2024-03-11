import {
    AfterViewInit,
    Component,
    EventEmitter,
    Output,
    input,
} from '@angular/core';
import {
    GameExpansionSet,
    MonsterTextes,
} from 'src/app/models/monster/monster';

@Component({
    inputs: ['mousePosition'],
    selector: 'monster-textes-displayer',
    templateUrl: './monster-textes-displayer.component.html',
    styleUrls: ['./monster-textes-displayer.component.scss'],
})
export class MonsterTextesDisplayerComponent {
    extension = input<GameExpansionSet>();

    hasIssueBeenCreated = input.required<boolean>();

    mousePosition!: { x: number; y: number };

    textes = input.required<MonsterTextes>();

    @Output()
    reportTextTypo = new EventEmitter<string>();
}
