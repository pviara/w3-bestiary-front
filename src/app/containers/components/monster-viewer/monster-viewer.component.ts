import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Component, inject } from '@angular/core';
import { Item } from '../../../models/item/item';
import { ItemsService } from '../../services/items.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Monster } from '../../../models/monster/monster';
import { MonstersService } from '../../services/monsters.service';
import { Typo } from '../../../models/typo/typo';

@Component({
    selector: 'monster-viewer',
    templateUrl: './monster-viewer.component.html',
    styleUrls: ['./monster-viewer.component.scss'],
    providers: [MonstersService],
})
export class MonsterViewerComponent {
    monster!: Monster;

    hasIssueBeenCreated = false;

    items!: Item[];

    reportedTypo: Typo | null = null;

    private _itemsService = inject(ItemsService);
    private _localStorageService = inject(LocalStorageService);
    private _monstersService = inject(MonstersService);
    private _route = inject(ActivatedRoute);

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
        this._localStorageService.langSubject.subscribe(() => {
            this._itemsService
                .getItems()
                .subscribe((items) => (this.items = items));
        });
    }
}
