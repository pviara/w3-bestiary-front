import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { MonstersService } from './services/monsters.service';

@Component({
  selector: 'monsters-explorer',
  templateUrl: './monsters-explorer.component.html',
  styleUrls: ['./monsters-explorer.component.scss']
})
export class MonstersExplorerComponent {
  categories!: any[];

  constructor(
    private _localStorageService: LocalStorageService,
    private _monstersService: MonstersService
  ) {}

  ngOnInit() {
    this._localStorageService
      .langSubject
      .subscribe(
        _ => {
          this._monstersService
            .getMonstersByCategories()
            .subscribe(
              (monstersByCategories: any) => this.categories = monstersByCategories
            );
        }
      );
  }
}