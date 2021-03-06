import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MonstersByCategory } from 'src/app/models/monster/monster';

@Injectable()
export class MonsterGuard implements CanActivate {
  private _monsterCodes: string[] = [];

  constructor(
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const isValidCode = this
      ._getMonsterCodes()
      .some(
        monsterCode => monsterCode === route.params['code']
      );
    if (!isValidCode) {
      this._router.navigate(['/']);
      return false;
    }
    return true;
  }

  private _getMonsterCodes(): string[] {
    let monstersByCategory: MonstersByCategory[] = [];

    try {
      monstersByCategory = this
        ._localStorageService
        .monstersByCategoriesByLang[0]
        .monsters;

    } catch (e: unknown) {
      this._router.navigate(['/']);
    }

    for (const monsterByCategory of monstersByCategory) {
      const monsterCodes = monsterByCategory
        .monsters
        .map(
          monster => monster.code
        );

      this._monsterCodes = [
        ...this._monsterCodes,
        ...monsterCodes
      ];
    }

    return this._monsterCodes;
  }
}