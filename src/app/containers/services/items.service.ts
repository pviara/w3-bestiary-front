import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/item/item';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { of, tap } from 'rxjs';

@Injectable()
export class ItemsService {
    constructor(
        private _httpClient: HttpClient,
        private _localStorageService: LocalStorageService,
    ) {}

    assembleImagePath(code: string) {
        return `${environment.apiURL}/item/thumbnail?code=${code}`;
    }

    getItems() {
        const { lang } = this._localStorageService;

        const cached = this._findItemsByLang(lang);
        if (cached) {
            return of(cached);
        }

        return this._httpClient
            .get<Item[]>(`${environment.apiURL}/item?lang=${lang}`)
            .pipe(
                tap((items) =>
                    this._localStorageService.addItemsToCache(items),
                ),
            );
    }

    private _findItemsByLang(lang: string): Item[] | undefined {
        try {
            return this._localStorageService.itemsByLang.find(
                (cached) => cached.lang === lang,
            )?.items;
        } catch (e: unknown) {
            return undefined;
        }
    }
}
