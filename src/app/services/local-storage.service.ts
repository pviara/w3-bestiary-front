import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  langSubject = new BehaviorSubject(
    this._getExistingOrDefaultLanguage()
  );

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

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));

    this.langSubject.next(value);
  }

  private _getExistingOrDefaultLanguage() {
    try {
      return this.lang;

    } catch (e: unknown) {
      return 'EN';
      
    }
  }
  
  private _getFromStorage(key: string) {
    return localStorage.getItem(key);
  }
}