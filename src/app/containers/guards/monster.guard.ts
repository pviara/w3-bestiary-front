import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable()
export class MonsterGuard implements CanActivate {
  constructor(private _localStorageService: LocalStorageService) {}
  
  canActivate(route: ActivatedRouteSnapshot) {
    const monsterCodes = this
      ._localStorageService
      .monsterCodes;
    
    const code = route.paramMap.get('code');
    return monsterCodes
      .some(
        monsterCode => monsterCode === code
      );
  }
}