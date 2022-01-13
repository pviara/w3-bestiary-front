import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/item/item';
import { ItemsService } from '../services/items.service';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable()
export class ItemsResolver implements Resolve<Observable<Item[]>> {
  constructor(private _itemsService: ItemsService) {}

  resolve() {
    return this._itemsService.getItems();
  }
}
