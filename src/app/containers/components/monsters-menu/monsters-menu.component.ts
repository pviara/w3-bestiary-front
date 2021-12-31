import { Component, Input } from '@angular/core';

@Component({
  selector: 'monsters-menu',
  templateUrl: './monsters-menu.component.html',
  styleUrls: ['./monsters-menu.component.scss']
})
export class MonstersMenuComponent {
  @Input()
  categories!: any[];

  selectedCategories: string[] = [];
  
  selectedMonster!: string;

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
  
  selectMonster(monsterCode: string) {
    this.selectedMonster = monsterCode;
  }
}