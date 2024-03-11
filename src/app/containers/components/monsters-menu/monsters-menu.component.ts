import { ActivatedRoute } from '@angular/router';
import {
    Component,
    EventEmitter,
    OnChanges,
    OnInit,
    Output,
    inject,
    input,
} from '@angular/core';
import { MonstersByCategory } from 'src/app/models/monster/monster';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
    selector: 'monsters-menu',
    templateUrl: './monsters-menu.component.html',
    styleUrls: ['./monsters-menu.component.scss'],
})
export class MonstersMenuComponent implements OnChanges, OnInit {
    filteredMonstersByCategory!: MonstersByCategory[];

    hasMonsterBeenClicked = input.required<boolean>();

    monsterCategories = input.required<MonstersByCategory[]>();

    @Output()
    monsterHasBeenClicked = new EventEmitter<boolean>();

    notFoundMonsterMessage = 'No monster was found';

    searchPlaceholder = 'Search by name';

    searchText!: string;

    selectedCategories: string[] = [];

    private _localStorageService = inject(LocalStorageService);
    private _route = inject(ActivatedRoute);

    ngOnChanges() {
        this._localStorageService.langSubject.subscribe((lang) => {
            this.searchText = '';
            this.filteredMonstersByCategory = this.monsterCategories();
            this.openCurrentMonsterCategory();

            switch (lang) {
                case 'EN': {
                    this.notFoundMonsterMessage = 'No monster was found';
                    this.searchPlaceholder = 'Search by name';
                    break;
                }

                case 'FR': {
                    this.notFoundMonsterMessage =
                        "Aucun monstre n'a été trouvé";
                    this.searchPlaceholder = 'Rechercher par nom';
                    break;
                }
            }
        });
    }

    ngOnInit() {
        this.filteredMonstersByCategory = this.monsterCategories();
    }

    assembleImagePath(monsterCode: string) {
        return `../../../../assets/bestiary/thumbnails/${monsterCode}.png`;
    }

    isCategorySelected(categoryName: string) {
        return this.selectedCategories.some(
            (selectedCategory) => selectedCategory === categoryName,
        );
    }

    onMonsterClick() {
        this.monsterHasBeenClicked.emit(true);
    }

    openCurrentMonsterCategory() {
        this.selectedCategories = [];

        const monsterCode = this._route.snapshot.firstChild?.params['code'];
        if (!monsterCode) {
            return;
        }

        const selectedMonsterCategory = this.monsterCategories().find(
            (category) =>
                category.monsters.some(
                    (monster) => monster.code === monsterCode,
                ),
        );
        if (!selectedMonsterCategory) {
            return;
        }

        this.toggleCategory(selectedMonsterCategory.category.code);
    }

    resetSearch(): void {
        this._hideSearchbarResetButton();
        this.filteredMonstersByCategory = this.monsterCategories();
        this.selectedCategories = [];
        this.openCurrentMonsterCategory();
        this.searchText = '';
    }

    search(event: any) {
        const searchText = event?.target?.value;
        if (!searchText) {
            this.resetSearch();
            return;
        }

        this._displaySearchbarResetButton();

        const filtered: MonstersByCategory[] = [];

        for (const monsterCategory of this.monsterCategories()) {
            const isSelected = this.selectedCategories.some(
                (categoryCode) =>
                    categoryCode === monsterCategory.category.code,
            );

            const monsterMatch = monsterCategory.monsters.some((monster) =>
                monster.textes.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()),
            );
            if (!monsterMatch) {
                if (isSelected) {
                    this.toggleCategory(monsterCategory.category.code);
                }
                continue;
            }

            if (!isSelected) {
                this.toggleCategory(monsterCategory.category.code);
            }

            filtered.push({
                category: monsterCategory.category,
                monsters: monsterCategory.monsters.filter((monster) =>
                    monster.textes.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase()),
                ),
            });
        }

        this.filteredMonstersByCategory = filtered;
    }

    toggleCategory(categoryCode: string) {
        const existingItem = this.selectedCategories.findIndex(
            (selectedCategory) => selectedCategory === categoryCode,
        );
        if (this.selectedCategories[existingItem]) {
            this.selectedCategories.splice(existingItem, 1);
        } else {
            this.selectedCategories.push(categoryCode);
        }
    }

    private _displaySearchbarResetButton(): void {
        document.querySelector('.reset-searchbar')?.classList.remove('hidden');
    }

    private _hideSearchbarResetButton(): void {
        document.querySelector('.reset-searchbar')?.classList.add('hidden');
    }
}
