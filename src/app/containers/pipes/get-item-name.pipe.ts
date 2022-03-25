import { Item } from 'src/app/models/item/item';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'get_item_name'
})
export class GetItemNamePipe implements PipeTransform {
    constructor() {}
    
    transform(code: string, items: Item[]) {
        return items
            .find(
                item => item.code === code
            )
            ?.name
    }
}