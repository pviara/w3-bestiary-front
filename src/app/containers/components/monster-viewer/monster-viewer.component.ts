import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'monster-viewer',
  templateUrl: './monster-viewer.component.html',
  styleUrls: ['./monster-viewer.component.scss']
})
export class MonsterViewerComponent {
  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this._route.snapshot.data);
  }
}