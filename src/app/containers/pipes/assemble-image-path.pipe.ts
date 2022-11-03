import { EntityType } from "src/app/models/app/entity-type";
import { ImageType } from "src/app/models/app/image-type";
import { MonstersService } from "../services/monsters.service";
import { Pipe, PipeTransform } from "@angular/core";
import { ItemsService } from "../services/items.service";

@Pipe({
    name: 'assembleImagePath'
})
export class AssembleImagePathPipe implements PipeTransform {
    constructor(
        private readonly _itemsService: ItemsService,
        private readonly _monstersService: MonstersService,
    ) {}
    
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