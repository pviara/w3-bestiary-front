import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Monster, MonstersByCategory } from 'src/app/models/monster/monster';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable()
export class MonstersService {
  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  getMonster(code: string) {
    const { lang } = this._localStorageService;
    return this
      ._httpClient
      .get<Monster>(
        `http://localhost:3000/api/monster/search?code=${code}&lang=${lang}`
      );
  }

  getMonstersByCategories() {
    const { lang } = this._localStorageService;
    return this
      ._httpClient
      .get<MonstersByCategory[]>(
        `http://localhost:3000/api/monster?lang=${lang}`
      );
  }
}