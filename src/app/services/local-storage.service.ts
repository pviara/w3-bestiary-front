import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  MonsterByCategory,
  MonstersByCategoriesByLang,
  MonstersByCategory
} from '../models/monster/monster';

@Injectable()
export class LocalStorageService {
  langSubject = new BehaviorSubject(
    this._getExistingOrDefaultLanguage()
  );

  get lang(): string {
    const langFromStorage = this._getFromStorage('lang');
    if (!langFromStorage) {
      throw new Error('No language is stored in local storage.');
    }

    return JSON.parse(langFromStorage) as string;
  }

  get monstersByCategoriesByLang(): MonstersByCategoriesByLang[] {
    const monstersByCategoriesFromStorage = this._getFromStorage('monstersByCategoriesByLang');
    if (!monstersByCategoriesFromStorage) {
      throw new Error('No monster by category by lang is stored in local storage.');
    }

    return JSON.parse(monstersByCategoriesFromStorage) as MonstersByCategoriesByLang[];
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

  set monstersByCategoriesByLang(value: MonstersByCategoriesByLang[]) {
    if (!value) {
      return;
    }
    const key = 'monstersByCategoriesByLang';

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  addMonstersByCategoriesToCache(monstersByCategories: MonstersByCategory[]): void {
    try {
      const cached = this
        .monstersByCategoriesByLang
        .find(
          cached => cached.lang === this.lang
        );
      if (cached) {
        return;
      }

      this._addMonstersByCategoriesByLangToCache(this.lang, monstersByCategories);

    } catch (e: unknown) {
      this.monstersByCategoriesByLang = [];
      this._addMonstersByCategoriesByLangToCache(this.lang, monstersByCategories);

    }
  }

  private _addMonstersByCategoriesByLangToCache(lang: string, monstersByCategories: MonstersByCategory[]): void {
    this.monstersByCategoriesByLang = [
      ...this.monstersByCategoriesByLang,
      {
        lang: this.lang,
        monsters: monstersByCategories
      }
    ];
  }
  
  private _getExistingOrDefaultLanguage(): string {
    try {
      return this.lang;

    } catch (e: unknown) {
      return 'EN';
      
    }
  }

  private _getExistingOrDefaultMonstersByCategoriesByLang(): MonstersByCategoriesByLang[] {
    try {
      return this.monstersByCategoriesByLang;

    } catch (e: unknown) {
      return [];
      
    }
  }
  
  private _getFromStorage(key: string) {
    return localStorage.getItem(key);
  }
}