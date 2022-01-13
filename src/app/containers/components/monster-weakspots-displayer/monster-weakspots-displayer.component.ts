import { Component, Input, OnChanges } from '@angular/core';
import { MonsterWeakspots } from 'src/app/models/monster/monster';

@Component({
    selector: 'monster-weakspots-displayer',
    templateUrl: './monster-weakspots-displayer.component.html',
    styleUrls: ['./monster-weakspots-displayer.component.scss']
})
export class MonsterWeakspotsDisplayerComponent implements OnChanges {
    items!: string[];
    
    @Input()
    weakspots!: MonsterWeakspots;

    ngOnChanges() {
        this.items = Object.values(this.weakspots)
            .reduce(
                (prev, next) => prev.concat(next),
                []
            );
    }
  
    assembleImagePath(code: string) {
      return `../../assets/icons/items/${code}.png`
    }
}
