import { Injectable } from '@angular/core';
import { MonstersService } from '../services/monsters.service';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable()
export class MonstersResolver implements Resolve<Observable<any>> {
  constructor(private _monstersService: MonstersService) {}
  
  resolve(): Observable<any> {
    return this._monstersService.getMenuMonsters();
  }

}