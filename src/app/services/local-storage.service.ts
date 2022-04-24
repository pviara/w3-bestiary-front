import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Item, ItemsByLang } from '../models/item/item';
import {
  Monster,
  MonstersByCategoriesByLang,
  MonstersByCategory,
  MonstersByLang
} from '../models/monster/monster';

@Injectable()
export class LocalStorageService {
  langSubject = new BehaviorSubject(
    this._getExistingOrDefaultLanguage()
  );
  
  get itemsByLang(): ItemsByLang[] {
    const itemsByLang = this._getFromStorage('itemsByLang');
    if (!itemsByLang) {
      throw new Error('No item by lang is stored in local storage.');
    }

    return JSON.parse(itemsByLang) as ItemsByLang[];
  }

  get lang(): string {
    const langFromStorage = this._getFromStorage('lang');
    if (!langFromStorage) {
      this.lang = 'EN';
      return this.lang;
    }

    return JSON.parse(langFromStorage) as string;
  }

  get monstersByCategoriesByLang(): MonstersByCategoriesByLang[] {
    const monstersByCategoriesByLangFromStorage = this._getFromStorage('monstersByCategoriesByLang');
    if (!monstersByCategoriesByLangFromStorage) {
      throw new Error('No monster by category by lang is stored in local storage.');
    }

    return JSON.parse(monstersByCategoriesByLangFromStorage) as MonstersByCategoriesByLang[];
  }

  get monstersByLang(): MonstersByLang[] {
    const monstersByLangFromStorage = this._getFromStorage('monstersByLang');
    if (!monstersByLangFromStorage) {
      throw new Error('No monster by lang is stored in local storage.');
    }

    return JSON.parse(monstersByLangFromStorage) as MonstersByLang[];
  }

  get version(): string {
    const version = this._getFromStorage('version');
    if (!version) {
      throw new Error('No version is stored in local storage.');
    }

    return JSON.parse(version) as string;
  }

  set itemsByLang(value: ItemsByLang[]) {
    if (!value) {
      return;
    }
    const key = 'itemsByLang';

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
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

  set monstersByLang(value: MonstersByLang[]) {
    if (!value) {
      return;
    }
    const key = 'monstersByLang';

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  set version(value: string) {
    if (!value) {
      return;
    }
    const key = 'version';

    if (this._getFromStorage(key)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));

    this._removeCachedElements();
  }

  addItemsToCache(items: Item[]): void {
    try {
      const cached = this
        .itemsByLang
        .find(
          cached => cached.lang === this.lang
        );
      if (cached) {
        return;
      }

      this._addItemsByLangToCache(this.lang, items);
      
    } catch (e: unknown) {
      this.itemsByLang = [];
      this._addItemsByLangToCache(this.lang, items);
    }
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

  addMonsterToCache(monster: Monster): void {
    try {
      const cached = this
        .monstersByLang
        .find(
          cached => cached.lang === this.lang
        );
      const cachedMonster = cached
        ?.monsters
        .find(
          cachedMonster => cachedMonster.code === monster.code
        );
      if (cachedMonster) {
        return;
      }

      this._addMonsterToCache(this.lang, monster, cached);
      
    } catch (e: unknown) {
      this.monstersByLang = [];

      this._addMonsterToCache(this.lang, monster);
      
    }
  }

  private _addItemsByLangToCache(lang: string, items: Item[]): void {
    this.itemsByLang = [
      ...this.itemsByLang,
      {
        lang: this.lang,
        items: items
      }
    ];
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

  private _addMonsterToCache(lang: string, monster: Monster, cached?: MonstersByLang): void {
    if (!cached) {
      this.monstersByLang = [
        ...this.monstersByLang,
        {
          lang: this.lang,
          monsters: [monster]
        }
      ];
    } else {
      const match = cached
        .monsters
        .find(
          cachedMonster => cachedMonster.code === monster.code
        );
      if (!match) {
        cached
          .monsters
          .push(monster);

        const monstersByLangIndex = this
          .monstersByLang
          .findIndex(
            cached => cached.lang === this.lang
          );

        const duplicate = this.monstersByLang;
        duplicate[monstersByLangIndex] = cached;
        
        this.monstersByLang = duplicate;
      }
    }
  }

  private _removeCachedElements(): void {
    const items = [
      'itemsByLang',
      'monstersByCategoriesByLang',
      'monstersByLang'
    ];
    for (const item of items) {
      localStorage.removeItem(item);
    }
  }
  
  private _getExistingOrDefaultLanguage(): string {
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