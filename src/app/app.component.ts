import { Component, OnInit } from '@angular/core';
import { LangSelectorComponent } from './components/lang-selector.component';
import { LocalStorageService } from './services/local-storage.service';
import { MonstersExplorerModule } from './containers/monsters-explorer.module';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [LangSelectorComponent, MonstersExplorerModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    ngOnInit() {
        console.log(`
       _    _      _ _       _
      | |  | |    | | |     | |
      | |__| | ___| | | ___ | |
      |  __  |/ _ \\ | |/ _ \\| |
      | |  | |  __/ | | (_) |_|
      |_|  |_|\\___|_|_|\\___/(_)

      Thank you for visiting this website.

      You may wonder why I've developed such a website. Well I was watching The Witcher on Netflix and I surprised myself pausing it several times, googling the monsters I would see on the screen. And I was like : "isn't there any website that references all of these monsters? In both french and english? And without any annoying ad?" And I just couldn't find it! So I decided to build one from scratch.

      Repositories are open-source and available here :
      · https://github.com/pviara/w3-bestiary-back
      · https://github.com/pviara/w3-bestiary-front

      API is completely free of use and some documentation is available at https://witcher-api.pviara.dev/apidocs


      With this,
      Enjoy your day
    `);
    }
}
