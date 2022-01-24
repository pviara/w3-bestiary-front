import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetItemNamePipe } from './pipes/get-item-name.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ItemsService } from './services/items.service';
import { ItemsResolver } from './resolvers/items.resolver';
import { MonsterGuard } from './guard/monster.guard';
import { MonstersExplorerComponent } from './monsters-explorer.component';
import { MonstersMenuComponent } from './components/monsters-menu/monsters-menu.component';
import { MonstersService } from './services/monsters.service';
import { MonsterTextesDisplayerComponent } from './components/monster-textes-displayer/monster-textes-displayer.component';
import { MonsterViewerComponent } from './components/monster-viewer/monster-viewer.component';
import { MonsterWeakspotsDisplayerComponent } from './components/monster-weakspots-displayer/monster-weakspots-displayer.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CapitalizePipe,
    GetItemNamePipe,
    MonstersExplorerComponent,
    MonstersMenuComponent,
    MonsterTextesDisplayerComponent,
    MonsterViewerComponent,
    MonsterWeakspotsDisplayerComponent,
  ],
  exports: [
    MonstersExplorerComponent,
    MonstersMenuComponent,
    MonsterViewerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    ItemsResolver,
    ItemsService,
    MonsterGuard,
    MonstersService
  ]
})
export class MonstersExplorerModule { }