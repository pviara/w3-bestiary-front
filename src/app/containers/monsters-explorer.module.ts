import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CommonModule } from '@angular/common';
import { MonsterCategoriesResolver } from './resolvers/monster-categories.resolver';
import { MonsterGuard } from './guards/monster.guard';
import { MonsterResolver } from './resolvers/monster.resolver';
import { MonstersExplorerComponent } from './monsters-explorer.component';
import { MonstersMenuComponent } from './components/monsters-menu/monsters-menu.component';
import { MonstersService } from './services/monsters.service';
import { MonsterTextesDisplayerComponent } from './components/monster-textes-displayer/monster-textes-displayer.component';
import { MonsterViewerComponent } from './components/monster-viewer/monster-viewer.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    RouterModule
  ],
  providers: [
    MonsterGuard,
    MonsterResolver,
    MonsterCategoriesResolver,
    MonstersService
  ]
})
export class MonstersExplorerModule {}