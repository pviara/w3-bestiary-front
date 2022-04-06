import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Version } from '../models/app/version';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class VersionService {
  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}
  
  getVersion() {
    return this
      ._httpClient
      .get<Version>(
        `${environment.apiURL}/version`
      ).pipe(
        tap(
          version => {
            try {
              const { version: cachedVersion } = this._localStorageService;
              if (cachedVersion !== version.content) {
                this._localStorageService.version = version.content;
                console.log('changed version', this._localStorageService.version);
              }

            } catch (e: unknown) {
              this._localStorageService.version = version.content;
              console.log('added version', this._localStorageService.version);
              
            }
          }
        )
      );
  }
}