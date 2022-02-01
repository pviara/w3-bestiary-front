import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  hasAppBeenReleased = false;

  countdown!: string;
  
  private _timer: any;

  ngOnDestroy() {
    clearInterval(this._timer);
  }
  
  ngOnInit() {
    const releaseDate = new Date('2022-02-15T22:00:00');
    
    this.countdown = this._computeCountDown(releaseDate, new Date());
    
    this._timer = setInterval((_: any) => {
      this.countdown = this._computeCountDown(releaseDate, new Date());
    }, 1000);
  }

  private _computeCountDown(releaseDate: Date, now: Date) {
    const difference = releaseDate.getTime() - now.getTime();
    const parsedDate = new Date(difference);

    return `
      ${parsedDate.getDate()} days,
      ${parsedDate.getHours()} hours,
      ${parsedDate.getMinutes()} minutes,
      ${parsedDate.getSeconds()} seconds
    `;
  }
}
