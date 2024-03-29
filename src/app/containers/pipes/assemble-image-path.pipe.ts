import { EntityType } from '../../models/app/entity-type';
import { ImageType } from '../../models/app/image-type';
import { ItemsService } from '../services/items.service';
import { MonstersService } from '../services/monsters.service';
import { Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
    name: 'assembleImagePath',
})
export class AssembleImagePathPipe implements PipeTransform {
    private readonly _itemsService = inject(ItemsService);
    private readonly _monstersService = inject(MonstersService);

    transform(code: string, entityType: EntityType, imageType?: ImageType) {
        if (entityType === 'monster') {
            if (!imageType) {
                throw new Error('Missing imageType for monster');
            }
            return this._monstersService.assembleImagePath(code, imageType);
        } else {
            return this._itemsService.assembleImagePath(code);
        }
    }
}
