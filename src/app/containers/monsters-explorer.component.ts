import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { MonstersByCategory } from '../models/monster/monster';
import { MonstersService } from './services/monsters.service';

@Component({
    selector: 'monsters-explorer',
    templateUrl: './monsters-explorer.component.html',
    styleUrls: ['./monsters-explorer.component.scss'],
    providers: [MonstersService],
})
export class MonstersExplorerComponent {
    categories!: MonstersByCategory[];

    hasMonsterBeenClicked = false;

    private _localStorageService = inject(LocalStorageService);
    private _monstersService = inject(MonstersService);
    private _route = inject(ActivatedRoute);
    private _router = inject(Router);

    ngOnInit() {
        this._hideMonsterMenu();

        this._localStorageService.langSubject.subscribe(() => {
            this._monstersService
                .getMonstersByCategories()
                .subscribe(
                    (monstersByCategories) =>
                        (this.categories = monstersByCategories),
                );
        });
    }

    goBack() {
        this._router.navigate(['../']);
    }

    setHasMonsterBeenClicked(event: boolean) {
        this.hasMonsterBeenClicked = event;
    }

    private _hideMonsterMenu() {
        const monsterCode = this._route.firstChild?.snapshot.params['code'];
        if (monsterCode) {
            this.hasMonsterBeenClicked = true;
        }

        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url.length > 1) {
                    this.hasMonsterBeenClicked = true;
                } else {
                    this.hasMonsterBeenClicked = false;
                }
            }
        });
    }
}
