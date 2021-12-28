import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonsterViewerComponent } from './components/monster-viewer/monster-viewer.component';
import { MonstersMenuComponent } from './components/monsters-menu/monsters-menu.component';
import { MonstersExplorerComponent } from './monsters-explorer.component';
import { MonsterResolver } from './resolvers/monster.resolver';
import { MonstersService } from './services/monsters.service';

@NgModule({
  declarations: [
    MonstersExplorerComponent,
    MonstersMenuComponent,
    MonsterViewerComponent,
  ],
  exports: [
    MonstersExplorerComponent,
    MonstersMenuComponent,
    MonsterViewerComponent,
  ],
  imports: [
    RouterModule
  ],
  providers: [
    MonsterResolver,
    MonstersService
  ]
})
export class MonstersExplorerModule {}