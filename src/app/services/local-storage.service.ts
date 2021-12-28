import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  private _getFromStorage(key: string) {
    return localStorage.getItem(key);
  }
}