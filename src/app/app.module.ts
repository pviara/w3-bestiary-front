import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LangSelectorComponent } from './components/lang-selector.component';
import { LocalStorageService } from './services/local-storage.service';
import { MonstersExplorerModule } from './containers/monsters-explorer.module';
import { NgModule } from '@angular/core';
import { VersionService } from './services/version.service';
import { VersionResolver } from './containers/resolvers/version.resolver';

@NgModule({
    declarations: [AppComponent, LangSelectorComponent],
    imports: [BrowserModule, AppRoutingModule, MonstersExplorerModule],
    providers: [LocalStorageService, VersionResolver, VersionService],
    bootstrap: [AppComponent],
})
export class AppModule {}
