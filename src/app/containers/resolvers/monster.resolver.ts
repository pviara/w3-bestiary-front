import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonstersService } from '../services/monsters.service';

@Injectable()
export class MonsterResolver implements Resolve<Observable<any>> {
  constructor(private _monstersService: MonstersService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const monsterCode = route.paramMap.get('code');
    return this._monstersService.get(monsterCode || '');
  }

}