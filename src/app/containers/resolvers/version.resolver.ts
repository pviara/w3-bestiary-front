import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Version } from 'src/app/models/app/version';
import { VersionService } from '../../services/version.service';

@Injectable()
export class VersionResolver  {
    constructor(private _versionService: VersionService) {}

    resolve() {
        return this._versionService.getVersion();
    }
}
