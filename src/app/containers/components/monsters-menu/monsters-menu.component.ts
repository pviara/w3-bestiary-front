import { Component, Input } from '@angular/core';

@Component({
  selector: 'monsters-menu',
  templateUrl: './monsters-menu.component.html',
  styleUrls: ['./monsters-menu.component.scss']
})
export class MonstersMenuComponent {
  @Input()
  categories!: any[];

  assembleImagePath(monsterCode: string) {
    return `../../../../assets/bestiary/thumbnails/${monsterCode}.png`;
  }
}