import { Component, OnChanges, input } from '@angular/core';
import { Item } from '../../../models/item/item';
import { MonsterWeakspots } from '../../../models/monster/monster';

@Component({
    selector: 'monster-weakspots-displayer',
    templateUrl: './monster-weakspots-displayer.component.html',
    styleUrls: ['./monster-weakspots-displayer.component.scss'],
})
export class MonsterWeakspotsDisplayerComponent implements OnChanges {
    hoverableWeakspots!: string[];

    items = input.required<Item[]>();

    weakspots = input.required<MonsterWeakspots>();

    ngOnChanges() {
        this.hoverableWeakspots = Object.values(this.weakspots()).reduce(
            (prev, next) => prev.concat(next),
            [],
        );
    }

    assembleImagePath(code: string) {
        return `../../assets/icons/items/${code}.png`;
    }
}
