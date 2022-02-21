import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  countdown!: string;

  hasAppBeenReleased!: boolean;

  private _timer: any;

  ngOnDestroy() {
    clearInterval(this._timer);
  }

  ngOnInit() {
    let now = new Date();

    const releaseDate = new Date('2022-03-01T20:00:00');
    const parsedDate = this._computeCountDown(releaseDate, now);

    if (parsedDate.getTime() <= 0) {
      this.hasAppBeenReleased = true;
    } else {
      this.hasAppBeenReleased = false;

      this.countdown = this._assembleCountdown(parsedDate);

      this._timer = setInterval((_: any) => {
        now = new Date();

        const parsedDate = this._computeCountDown(releaseDate, now);
        if (parsedDate.getTime() <= 0) {
          this.hasAppBeenReleased = true;
          clearInterval(this._timer);
          return;
        }

        this.countdown = this._assembleCountdown(parsedDate);
      }, 1000);
    }
  }

  private _assembleCountdown(parsedDate: Date) {
    const date = parsedDate.getDate() - 1;
    const hours = parsedDate.getHours() - 1;
    const minutes = parsedDate.getMinutes();
    const seconds = parsedDate.getSeconds();

    const addPluralSuffix = (value: number) => {
      return value > 1 ? 's' : '';
    };

    return `
      ${date >= 0 ? date : 0} day${addPluralSuffix(date)}, 
      ${hours >= 0 ? hours : 0} hour${addPluralSuffix(hours)}, 
      ${minutes} minute${addPluralSuffix(minutes)}, 
      ${seconds} second${addPluralSuffix(seconds)}
    `;
  }

  private _computeCountDown(releaseDate: Date, now: Date) {
    const difference = releaseDate.getTime() - now.getTime();
    return new Date(difference);
  }
}
