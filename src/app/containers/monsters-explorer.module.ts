import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CommonModule } from '@angular/common';
import { MonstersExplorerComponent } from './monsters-explorer.component';
import { MonstersMenuComponent } from './components/monsters-menu/monsters-menu.component';
import { MonstersService } from './services/monsters.service';
import { MonsterTextesDisplayerComponent } from './components/monster-textes-displayer/monster-textes-displayer.component';
import { MonsterViewerComponent } from './components/monster-viewer/monster-viewer.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CapitalizePipe,
    MonstersExplorerComponent,
    MonstersMenuComponent,
    MonsterTextesDisplayerComponent,
    MonsterViewerComponent,
  ],
  exports: [
    MonstersExplorerComponent,
    MonstersMenuComponent,
    MonsterViewerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    MonstersService
  ]
})
export class MonstersExplorerModule {}