import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MonsterByCategory, MonstersByCategory } from 'src/app/models/monster/monster';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'monsters-menu',
  templateUrl: './monsters-menu.component.html',
  styleUrls: ['./monsters-menu.component.scss']
})
export class MonstersMenuComponent implements OnInit {
  filteredMonstersByCategory!: MonstersByCategory[];
  
  @Input()
  monsterCategories!: MonstersByCategory[];

  notFoundMonsterMessage = 'No monster was found';

  searchPlaceholder = 'Search by name';

  searchText!: string;
  
  selectedCategories: string[] = [];

  constructor(
    private _localStorageService: LocalStorageService,
    private _route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.filteredMonstersByCategory = this.monsterCategories;
    
    // // this.openCurrentMonsterCategory();

    this
      ._localStorageService
      .langSubject
      .subscribe(
        lang => {
          this.searchText = '';
          this.filteredMonstersByCategory = this.monsterCategories;
          this.openCurrentMonsterCategory();
          
          switch (lang) {
            case 'EN': {
              this.notFoundMonsterMessage = 'No monster was found';
              this.searchPlaceholder = 'Search by name';
              break;
            }

            case 'FR': {
              this.notFoundMonsterMessage = "Aucun monstre n'a été trouvé";
              this.searchPlaceholder = 'Rechercher par nom';
              break;
            }
          }
        }
      );
    
    // // this._computeNotFoundMonsterMessage();
    // // this._computeSearchBarPlaceholder();
  }

  private _computeNotFoundMonsterMessage() {
    this
      ._localStorageService
      .langSubject
      .subscribe(
        lang => this.notFoundMonsterMessage = lang === 'EN'
          ? 'No monster was found'
          : "Aucun monstre n'a été trouvé"
      );
  }

  private _computeSearchBarPlaceholder() {
    this
      ._localStorageService
      .langSubject
      .subscribe(
        lang => this.searchPlaceholder = lang === 'EN'
          ? 'Search by name'
          : 'Rechercher par nom'
      );
  }
  
  assembleImagePath(monsterCode: string) {
    return `../../../../assets/bestiary/thumbnails/${monsterCode}.png`;
  }

  isCategorySelected(categoryName: string) {
    return this
      .selectedCategories
      .some(
        selectedCategory => selectedCategory === categoryName
      );
  }

  openCurrentMonsterCategory() {
    this.selectedCategories = [];
    
    const monsterCode = this
      ._route
      .snapshot
      .firstChild
      ?.params['code'];
    if (!monsterCode) {
      return;
    }

    const selectedMonsterCategory = this
      .monsterCategories
      .find(
        category => category
          .monsters
          .some(
            monster => monster.code === monsterCode
          )
      );
    if (!selectedMonsterCategory) {
      return;
    }

    this.toggleCategory(selectedMonsterCategory.category.code);
  }

  search(event: any) {
    const searchText = event?.target?.value;
    if (!searchText) {
      this.filteredMonstersByCategory = this.monsterCategories;
      this.selectedCategories = [];
      this.openCurrentMonsterCategory();
      return;
    }

    const filtered: MonstersByCategory[] = [];

    for (const monsterCategory of this.monsterCategories) {
      const isSelected = this
        .selectedCategories
        .some(
          categoryCode => categoryCode === monsterCategory.category.code
        );

      const monsterMatch = monsterCategory
        .monsters
        .some(
          monster => monster
            .textes
            .name
            .toLowerCase()
            .includes(
              searchText
                .toLowerCase()
            )
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
          monsters: monsterCategory
            .monsters
            .filter(
              monster => monster
                .textes
                .name
                .toLowerCase()
                .includes(
                  searchText
                    .toLowerCase()
                )
            )
        });
    }

    this.filteredMonstersByCategory = filtered;
  }

  toggleCategory(categoryCode: string) {
    const existingItem = this
      .selectedCategories
      .findIndex(
        selectedCategory => selectedCategory === categoryCode
      );
    if (this.selectedCategories[existingItem]) {
      this
        .selectedCategories
        .splice(
          existingItem,
          1
        );
    } else {
      this
        .selectedCategories
        .push(
          categoryCode
        );
    }
  }
}