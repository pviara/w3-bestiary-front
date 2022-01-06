import { Component, Input } from '@angular/core';
import { MonsterTextes } from 'src/app/models/monster/monster';

@Component({
  selector: 'monster-textes-displayer',
  templateUrl: './monster-textes-displayer.component.html',
  styleUrls: ['./monster-textes-displayer.component.scss']
})
export class MonsterTextesDisplayerComponent {
  @Input()
  textes!: MonsterTextes;
}