import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'monsters-menu',
  templateUrl: './monsters-menu.component.html',
  styleUrls: ['./monsters-menu.component.scss']
})
export class MonstersMenuComponent {
  @Input()
  categories!: any[];

  selectedCategories: string[] = [];

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this.openCurrentMonsterCategory();
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
    const monsterCode = this
      ._route
      .snapshot
      .firstChild
      ?.params['code'];
    if (!monsterCode) {
      return;
    }

    const selectedMonsterCategory = this
      .categories
      .find(
        category => category
          .monsters
          .some(
            (monster: any) => monster.code === monsterCode
          )
      );
    if (!selectedMonsterCategory) {
      return;
    }

    this.toggleCategory(selectedMonsterCategory.categoryName);
  }

  toggleCategory(categoryName: string) {
    const existingItem = this
      .selectedCategories
      .findIndex(
        selectedCategory => selectedCategory === categoryName
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
          categoryName
        );
    }
  }
}