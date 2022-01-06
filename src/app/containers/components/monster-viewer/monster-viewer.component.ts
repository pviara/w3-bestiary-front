import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'monster-viewer',
  templateUrl: './monster-viewer.component.html',
  styleUrls: ['./monster-viewer.component.scss']
})
export class MonsterViewerComponent {
  monster!: any;
  
  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this
      ._route
      .data
      .subscribe(
        data => this.monster = data['monster']
      );
  }
}