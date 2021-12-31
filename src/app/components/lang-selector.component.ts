import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'lang-selector',
  templateUrl: 'lang-selector.component.html',
  styleUrls: ['lang-selector.component.scss']
})
export class LangSelectorComponent implements OnInit {
  languages = ['EN', 'FR'];

  private _selected = 'EN';

  constructor(
    private _localStorageService: LocalStorageService
  ) {}
  
  ngOnInit() {
    try {
      this._selected = this
        ._localStorageService
        .lang;

    } catch (e: unknown) {
      this
        ._localStorageService
        .lang = this._selected;
      
    }
  }
  
  assembleImagePath(lang: string) {
    return `../../assets/icons/lang/lang_${lang}.png`
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
    this
      ._localStorageService
      .lang = this._selected;
  }
}
