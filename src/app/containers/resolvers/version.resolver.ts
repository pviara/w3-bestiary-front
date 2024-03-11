import { Injectable, inject } from '@angular/core';
import { VersionService } from '../../services/version.service';

@Injectable({
    providedIn: 'root',
})
export class VersionResolver {
    private _versionService = inject(VersionService);

    resolve() {
        return this._versionService.getVersion();
    }
}
