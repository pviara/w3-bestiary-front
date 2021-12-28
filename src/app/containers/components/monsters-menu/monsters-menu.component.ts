import { Component, Input } from '@angular/core';

@Component({
  selector: 'monsters-menu',
  templateUrl: './monsters-menu.component.html',
  styleUrls: ['./monsters-menu.component.scss']
})
export class MonstersMenuComponent {
  @Input()
  monsters!: any[];
  
  ngOnInit() {
    console.log('initialized', this.constructor.name);
  }
}