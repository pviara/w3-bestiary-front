import { MonsterCategoriesResolver } from './containers/resolvers/monster-categories.resolver';
import { MonsterGuard } from './containers/guards/monster.guard';
import { MonsterResolver } from './containers/resolvers/monster.resolver';
import { MonstersExplorerComponent } from './containers/monsters-explorer.component';
import { MonsterViewerComponent } from './containers/components/monster-viewer/monster-viewer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  component: MonstersExplorerComponent,
  path: '',
  resolve: {
    categories: MonsterCategoriesResolver
  },
  children: [{
    component: MonsterViewerComponent,
    path: ':code',
    resolve: {
        monster: MonsterResolver
    }
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
