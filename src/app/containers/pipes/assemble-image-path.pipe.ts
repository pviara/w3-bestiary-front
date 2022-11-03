import { MonstersService } from "../services/monsters.service";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'assembleImagePath'
})
export class AssembleImagePathPipe implements PipeTransform {
    constructor(
        private readonly _monsterService: MonstersService
    ) {}
    
    transform(code: string) {
        return this._monsterService.assembleImagePath(code);
    }
}