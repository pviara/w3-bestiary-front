import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { MonstersByCategory } from '../models/monster/monster';
import { MonstersService } from './services/monsters.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'monsters-explorer',
  templateUrl: './monsters-explorer.component.html',
  styleUrls: ['./monsters-explorer.component.scss']
})
export class MonstersExplorerComponent {
  categories!: MonstersByCategory[];

  hasMonsterBeenClicked = false;
  
  constructor(
    private _route: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _monstersService: MonstersService
  ) {}

  ngOnInit() {
    this._hideMonsterMenu();
    
    this._localStorageService
      .langSubject
      .subscribe(
        _ => {
          this._monstersService
            .getMonstersByCategories()
            .subscribe(
              monstersByCategories => this.categories = monstersByCategories
            );
        }
      );
  }

  setHasMonsterBeenClicked(event: boolean) {
    this.hasMonsterBeenClicked = event;
    console.log(this.hasMonsterBeenClicked);
  }

  private _hideMonsterMenu() {
    const monsterCode = this
      ._route
      .snapshot
      .firstChild
      ?.params['code'];
    if (monsterCode) {
      this.hasMonsterBeenClicked = true;
    }
  }
}