import { Component } from '@angular/core';

@Component({
  selector: 'lang-selector',
  templateUrl: 'lang-selector.component.html',
  styleUrls: ['lang-selector.component.scss']
})
export class LangSelectorComponent {
  languages = ['EN', 'FR'];

  private _selected = 'EN';

  constructor(
    // private _localStorageService: LocalStorageService
  ) {}
  
  assembleImagePath(lang: string) {
    return `../../assets/lang_${lang}.png`
  }

  isSelected(lang: string) {
    return this._selected === lang;
  }

  selectLang(lang: string) {
    const exists = this
      .languages
      .find(
        language => language === lang
      );
    if (!exists) {
      throw new Error(`No such language as "${lang}" exists in the list of available languages.`);
    }

    this._selected = lang;
  }
}
