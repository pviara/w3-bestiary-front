import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Monster } from 'src/app/models/monster/monster';
import { MonstersService } from '../../services/monsters.service';
import { TyposService } from '../../services/typos.service';

@Component({
  selector: 'monster-viewer',
  templateUrl: './monster-viewer.component.html',
  styleUrls: ['./monster-viewer.component.scss']
})
export class MonsterViewerComponent {
  monster!: Monster;

  hasIssueBeenCreated = false;

  constructor(
    private _route: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _monstersService: MonstersService,
    private _typosService: TyposService,
  ) { }

  ngOnInit() {
    this.loadMonsterWhenChangedCodeParam();
    this.reloadMonsterWhenLangChanged();
  }

  assembleImagePath(code: string) {
    return `../../../../assets/bestiary/images/${code}.png`;
  }

  onReportTextTypo(typo: string) {
    this.hasIssueBeenCreated = false;
    
    this
      ._typosService
      .reportTextTypo(
        this.monster.code,
        typo
      )
      .subscribe(
        typo => {
          this.hasIssueBeenCreated = !!typo;
        }
      );
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