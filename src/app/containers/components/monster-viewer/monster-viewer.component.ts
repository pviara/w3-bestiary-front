import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Component } from '@angular/core';
import { Item } from 'src/app/models/item/item';
import { ItemsService } from '../../services/items.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Monster } from 'src/app/models/monster/monster';
import { MonstersService } from '../../services/monsters.service';
import { Typo } from 'src/app/models/typo/typo';

@Component({
    selector: 'monster-viewer',
    templateUrl: './monster-viewer.component.html',
    styleUrls: ['./monster-viewer.component.scss'],
})
export class MonsterViewerComponent {
    monster!: Monster;

    hasIssueBeenCreated = false;

    items!: Item[];

    reportedTypo: Typo | null = null;

    constructor(
        private _route: ActivatedRoute,
        private _itemsService: ItemsService,
        private _localStorageService: LocalStorageService,
        private _monstersService: MonstersService,
    ) {}

    ngOnInit() {
        this.reloadItemsWhenLangChanged();
        this.reloadMonsterWhenNeeded();
    }

    onReportTextTypo(typo: string) {
        this.hasIssueBeenCreated = false;

        this._monstersService
            .reportTextTypo(this.monster.code, typo)
            .subscribe({
                next: (typo) => {
                    this.reportedTypo = typo;

                    setTimeout(() => {
                        this.hasIssueBeenCreated = !!typo;
                    }, 3000);
                },
                error: (err) => {
                    if (err.status === 409) {
                        this.reportedTypo = {
                            _id: '',
                            lang: '',
                            monsterCode: '',
                            content: '',
                            isError: true,
                        };

                        setTimeout(() => {
                            this.hasIssueBeenCreated = !!typo;
                        }, 3000);
                    }
                },
            });
    }

    private reloadMonsterWhenNeeded() {
        combineLatest([
            this._localStorageService.langSubject,
            this._route.params,
        ]).subscribe(([, params]) => {
            const monsterCode = params['code'];

            if (monsterCode) {
                this._monstersService
                    .getMonster(monsterCode)
                    .subscribe((monster) => (this.monster = monster));
            }
        });
    }

    private reloadItemsWhenLangChanged() {
        this._localStorageService.langSubject.subscribe((_) => {
            this._itemsService
                .getItems()
                .subscribe((items) => (this.items = items));
        });
    }
}
