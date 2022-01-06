import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
        .get(
            `http://localhost:3000/api/monster/search?code=${code}&lang=${lang}`
        );
  }

  getMonstersByCategories() {
    const { lang } = this._localStorageService;
    return this
        ._httpClient
        .get(
            `http://localhost:3000/api/monster?lang=${lang}`
        );
  }
}