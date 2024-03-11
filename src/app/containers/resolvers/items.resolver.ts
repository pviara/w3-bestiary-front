import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/item/item';
import { ItemsService } from '../services/items.service';
import { Observable } from 'rxjs';


@Injectable()
export class ItemsResolver  {
    constructor(private _itemsService: ItemsService) {}

    resolve() {
        return this._itemsService.getItems();
    }
}
