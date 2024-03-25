import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Item } from '../../models/item/item';
import { LocalStorageService } from '../../services/local-storage.service';
import { of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ItemsService {
    private _httpClient = inject(HttpClient);
    private _localStorageService = inject(LocalStorageService);
    private _platformId = inject(PLATFORM_ID);

    assembleImagePath(code: string) {
        return `${environment.apiURL}/item/thumbnail?code=${code}`;
    }

    getItems() {
        const { lang } = this._localStorageService;

        const cached = this._findItemsByLang(lang);
        if (cached) {
            return of(cached);
        }

        if (isPlatformBrowser(this._platformId)) {
            return this._httpClient
                .get<Item[]>(`${environment.apiURL}/item?lang=${lang}`)
                .pipe(
                    tap((items) =>
                        this._localStorageService.addItemsToCache(items),
                    ),
                );
        }
        return of([]);
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
