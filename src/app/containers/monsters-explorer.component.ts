import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'monsters-explorer',
  templateUrl: './monsters-explorer.component.html',
  styleUrls: ['./monsters-explorer.component.scss']
})
export class MonstersExplorerComponent {
  categories!: any[];

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this.categories = this._route.snapshot.data['categories'];
  }
}