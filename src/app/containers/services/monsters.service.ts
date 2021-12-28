// // import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { of } from 'rxjs';

@Injectable()
export class MonstersService {
  constructor(
    // // private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  get(code: string) {
    const lang = this._localStorageService.lang;
    console.log('GET', `https://w3.bestiary.app/api/monster/${code}?lang=${lang}`);
    return of({
      code,
      name: 'monster_name'
    });
  }
}