import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { tap } from 'rxjs';
import { Version } from '../models/app/version';

@Injectable()
export class VersionService {
    private _httpClient = inject(HttpClient);
    private _localStorageService = inject(LocalStorageService);

    getVersion() {
        return this._httpClient
            .get<Version>(`${environment.apiURL}/version`)
            .pipe(
                tap((version) => {
                    try {
                        const { version: cachedVersion } =
                            this._localStorageService;
                        if (cachedVersion !== version.content) {
                            this._localStorageService.version = version.content;
                        }
                    } catch (e: unknown) {
                        this._localStorageService.version = version.content;
                    }
                }),
            );
    }
}
