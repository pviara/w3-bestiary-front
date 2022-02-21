import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Monster } from 'src/app/models/monster/monster';
import { MonstersService } from '../../services/monsters.service';
import { Typo } from 'src/app/models/typo/typo';

@Component({
  selector: 'monster-viewer',
  templateUrl: './monster-viewer.component.html',
  styleUrls: ['./monster-viewer.component.scss']
})
export class MonsterViewerComponent {
  monster!: Monster;

  hasIssueBeenCreated = false;

  reportedTypo: Typo | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _monstersService: MonstersService,
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
      ._monstersService
      .reportTextTypo(
        this.monster.code,
        typo
      )
      .subscribe(
        typo => {
          this.reportedTypo = typo;

          setTimeout(() => {
            this.hasIssueBeenCreated = !!typo;
          }, 3000);
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