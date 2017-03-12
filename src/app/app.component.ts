import { Component, OnInit } from '@angular/core';
import { DatesService } from './dates.service';
import { EventRepoService } from './eventRepo.service';
import { StorageService } from './storage.service';
import { IDay } from './iday';

var module: any;

@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css'],
  providers: [DatesService, EventRepoService, StorageService]
})
export class AppComponent implements OnInit {
  monthName: string;
  daysOfWeek: string[];
  dayRows: IDay[][];
  isBgShown: boolean;

  constructor(
    private datesService: DatesService,
    private eventRepo: EventRepoService) { }

  ngOnInit(): void {
    this.daysOfWeek = this.datesService.getDaysOfWeek();
    this.refreshMonth();
  }

  setPrev(): void {
    this.datesService.setPrevMonth();
    this.refreshMonth();
  }

  setNext(): void {
    this.datesService.setNextMonth();
    this.refreshMonth();
  }

  addEvent(eventText: string, day: number): void {
    let foundDay: IDay = this.dayRows.reduce((res, row) =>
      res ? res : row.find(d => d.isThisMonth && d.dayNumber === day)
      , undefined);

      if (Array.isArray(foundDay.events)) {
        foundDay.events.push(eventText);
      } else {
        foundDay.events = [eventText];
      }

      this.eventRepo.addDayEvent(this.datesService.getCurrentMonth(), day, eventText);
  }

  private refreshMonth(): void {
    this.monthName = this.datesService.getMonthName();
    this.dayRows = this.datesService.getDaysOfMonthMatrix();
    this.isBgShown = false;
  }
}
