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

  getMonster(code: string) {
    const { lang } = this._localStorageService;
    console.log('GET', `https://w3.bestiary.app/api/monster/${code}?lang=${lang}`);
    return of({
      code,
      name: 'chien',
      textes: {
        description: 'Lorem ipsum...',
        quote: {
          author: {
            firstname: 'alfred',
            lastname: 'pankratz',
            title: 'Novigrad mendicant'
          },
          text: "Le chien est le meilleur ami de l'homme, il paraît... mais par les temps qui courent, vaut mieux se méfier de tout le monde, même de ses amis.",
        },
      },
      weakspots: {
        bombs: [],
        oils: [],
        potions: [],
        signs: []
      }
    });
  }

  getMenuMonsters() {
    const { lang } = this._localStorageService;
    console.log('GET', `https://w3.bestiary.app/api/monster?lang=${lang}`);
    return of([
      {
        code: 'bear',
        name: 'ours',
        thumbnail: ''
      },
      {
        code: 'dog',
        name: 'chien',
        thumbnail: ''
      }
    ]);
  }
}