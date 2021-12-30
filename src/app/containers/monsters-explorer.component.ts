import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'monsters-explorer',
  templateUrl: './monsters-explorer.component.html',
  styleUrls: ['./monsters-explorer.component.scss']
})
export class MonstersExplorerComponent {
  monsters!: any[];

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this._route.snapshot.data);
  }
}