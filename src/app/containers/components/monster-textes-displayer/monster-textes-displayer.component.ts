import { Component, Input } from '@angular/core';

@Component({
  selector: 'monster-textes-displayer',
  templateUrl: './monster-textes-displayer.component.html',
  styleUrls: ['./monster-textes-displayer.component.scss']
})
export class MonsterTextesDisplayerComponent {
  @Input()
  name!: string;
  
  @Input()
  textes!: any;
}