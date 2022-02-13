import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LangSelectorComponent } from './components/lang-selector.component';
import { LocalStorageService } from './services/local-storage.service';
import { MonstersExplorerModule } from './containers/monsters-explorer.module';
import { NgModule } from '@angular/core';

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
