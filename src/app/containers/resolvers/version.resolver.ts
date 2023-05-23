import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Version } from 'src/app/models/app/version';
import { VersionService } from '../../services/version.service';

@Injectable()
export class VersionResolver implements Resolve<Observable<Version>> {
    constructor(private _versionService: VersionService) {}

    resolve() {
        return this._versionService.getVersion();
    }
}
