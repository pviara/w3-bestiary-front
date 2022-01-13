import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs';
import { ItemsService } from '../services/items.service';

@Pipe({
    name: 'get_item_name'
})
export class GetItemNamePipe implements PipeTransform {
    constructor(private _itemsService: ItemsService) {}
    
    transform(code: string) {
        return this
            ._itemsService
            .getItems()
            .pipe(
                map(
                    items => items
                        .find(
                            item => item.code === code
                        )
                        ?.name
                )
            );
    }
}