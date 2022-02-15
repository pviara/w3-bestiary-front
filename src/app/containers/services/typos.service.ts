import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ReportTextTypoPayload } from 'src/app/models/DTO/report-text-typo.payload';
import { Typo } from 'src/app/models/typo/typo';

@Injectable()
export class TyposService {
  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  reportTextTypo(monsterCode: string, typo: string) {
    const { lang } = this._localStorageService;

    const payload = new ReportTextTypoPayload(lang, monsterCode, typo);

    return this._httpClient.post<Typo>(`${environment.apiURL}/typo`, payload);
  }
}
