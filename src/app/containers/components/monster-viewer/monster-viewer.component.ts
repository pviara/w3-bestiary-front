import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Monster } from 'src/app/models/monster/monster';
import { MonstersService } from '../../services/monsters.service';

@Component({
  selector: 'monster-viewer',
  templateUrl: './monster-viewer.component.html',
  styleUrls: ['./monster-viewer.component.scss']
})
export class MonsterViewerComponent {
  monster!: Monster;

  constructor(
    private _route: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _monstersService: MonstersService
  ) { }

  ngOnInit() {
    this.loadMonsterWhenChangedCodeParam();
    this.reloadMonsterWhenLangChanged();
  }

  assembleImagePath(code: string) {
    return `../../../../assets/bestiary/images/${code}.png`;
  }

  private loadMonsterWhenChangedCodeParam() {
    this._route
      .params
      .subscribe(
        params => {
          const monsterCode = params['code'];
          if (monsterCode) {
            this._monstersService
              .getMonster(monsterCode)
              .subscribe(
                monster => this.monster = monster
              );
          }
        }
      );
  }

  private reloadMonsterWhenLangChanged() {
    this._localStorageService
      .langSubject
      .subscribe(
        _ => {
          const monsterCode = this._route.snapshot.params['code'];
          if (monsterCode) {
            this._monstersService
              .getMonster(monsterCode)
              .subscribe(
                monster => this.monster = monster
              );
          }
        }
      );
  }
}