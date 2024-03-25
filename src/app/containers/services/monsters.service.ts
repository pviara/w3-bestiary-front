import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ImageType } from '../../models/app/image-type';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { Monster, MonstersByCategory } from '../../models/monster/monster';
import { of, tap } from 'rxjs';
import { ReportTextTypoPayload } from '../../models/monster/DTO/report-text-typo.payload';
import { Typo } from '../../models/typo/typo';

@Injectable()
export class MonstersService {
    private _httpClient = inject(HttpClient);
    private _localStorageService = inject(LocalStorageService);
    private _platformId = inject(PLATFORM_ID);

    assembleImagePath(code: string, imageType: ImageType) {
        return `${environment.apiURL}/monster/${imageType}?code=${code}`;
    }

    getMonster(code: string) {
        const { lang } = this._localStorageService;

        const cached = this._findMonsterByLang(lang, code);
        if (cached) {
            return of(cached);
        }

        return this._httpClient
            .get<Monster>(`${environment.apiURL}/monster/${code}?lang=${lang}`)
            .pipe(
                tap((monster) =>
                    this._localStorageService.addMonsterToCache(monster),
                ),
            );
    }

    getMonstersByCategories() {
        const { lang } = this._localStorageService;

        const cached = this._findMonstersByCategoriesByLang(lang);
        if (cached) {
            return of(cached);
        }

        if (isPlatformBrowser(this._platformId)) {
            return this._httpClient
                .get<
                    MonstersByCategory[]
                >(`${environment.apiURL}/monster?lang=${lang}`)
                .pipe(
                    tap((monstersByCategories) =>
                        this._localStorageService.addMonstersByCategoriesToCache(
                            monstersByCategories,
                        ),
                    ),
                );
        }
        return of([]);
    }

    reportTextTypo(monsterCode: string, typo: string) {
        const { lang } = this._localStorageService;

        const payload = new ReportTextTypoPayload(lang, monsterCode, typo);

        return this._httpClient.post<Typo>(
            `${environment.apiURL}/monster/typo`,
            payload,
        );
    }

    private _findMonstersByCategoriesByLang(
        lang: string,
    ): MonstersByCategory[] | undefined {
        try {
            return this._localStorageService.monstersByCategoriesByLang.find(
                (cached) => cached.lang === lang,
            )?.monsters;
        } catch (e: unknown) {
            return undefined;
        }
    }

    private _findMonsterByLang(
        lang: string,
        code: string,
    ): Monster | undefined {
        try {
            const match = this._localStorageService.monstersByLang
                .find((cached) => cached.lang === lang)
                ?.monsters.find((monster) => monster.code === code);
            return match;
        } catch (e: unknown) {
            return undefined;
        }
    }
}
