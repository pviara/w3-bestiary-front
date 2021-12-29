import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  langSubject = new BehaviorSubject('EN');

  get lang() {
    const langFromStorage = this._getFromStorage('lang');
    if (!langFromStorage) {
      throw new Error('No language is stored in local storage.');
    }

    return JSON.parse(langFromStorage) as string;
  }

  set lang(value: string) {
    if (!value) {
      return;
    }
    const key = 'lang';

    this.langSubject.next(value);

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  get monsterCodes() {
    return ['dog'];

    // TODO 🛠 uncomment these
    // // const monsterCodesFromStorage = this._getFromStorage('monsterCodes');
    // // if (!monsterCodesFromStorage) {
    // //   throw new Error('Not a single monster code is stored in local storage.');
    // // }

    // // return JSON.parse(monsterCodesFromStorage) as string[];
  }

  set monsterCodes(value: string[]) {
    if (!value) {
      return;
    }
    const key = 'monsterCodes';

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  private _getFromStorage(key: string) {
    return localStorage.getItem(key);
  }
}