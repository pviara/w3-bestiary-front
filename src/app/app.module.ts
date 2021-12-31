import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LangSelectorComponent } from './components/lang-selector.component';
import { MonstersExplorerModule } from './containers/monsters-explorer.module';
import { CapitalizePipe } from './containers/pipes/capitalize.pipe';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    LangSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MonstersExplorerModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
