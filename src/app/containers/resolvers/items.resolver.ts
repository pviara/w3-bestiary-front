import { Injectable, inject } from '@angular/core';
import { ItemsService } from '../services/items.service';

@Injectable({
    providedIn: 'root',
})
export class ItemsResolver {
    private _itemsService = inject(ItemsService);

    resolve() {
        return this._itemsService.getItems();
    }
}
