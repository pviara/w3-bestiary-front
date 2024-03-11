import { ItemsResolver } from './containers/resolvers/items.resolver';
import { MonsterGuard } from './containers/guard/monster.guard';
import { MonstersExplorerComponent } from './containers/monsters-explorer.component';
import { MonsterViewerComponent } from './containers/components/monster-viewer/monster-viewer.component';
import { Routes } from '@angular/router';
import { VersionResolver } from './containers/resolvers/version.resolver';

export const routes: Routes = [
    {
        component: MonstersExplorerComponent,
        path: '',
        resolve: {
            version: VersionResolver,
            items: ItemsResolver,
        },
        children: [
            {
                component: MonsterViewerComponent,
                canActivate: [MonsterGuard],
                path: ':code',
            },
        ],
    },
];
