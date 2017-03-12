import { Component, OnChanges, OnInit, Input, SimpleChange } from '@angular/core';
import { EventRepoService } from './eventRepo.service';
import { StorageService } from './storage.service';
import { IDay } from './iday';
import { MonthUtils } from './month-utils';

var module: any;

@Component({
  selector: 'calendar',
  moduleId: module.id,
  templateUrl: './calendar.component.html',
  styleUrls: [ './calendar.component.css'],
  providers: [EventRepoService, StorageService]
})
export class CalendarComponent implements OnChanges, OnInit {
  @Input() month: Date;

  monthName: string;
  daysOfWeek: string[];
  dayRows: IDay[][];
  isBgShown: boolean;

  constructor(
    private eventRepo: EventRepoService) { }

  ngOnInit() {
    this.daysOfWeek = MonthUtils.getDaysOfWeek();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes.hasOwnProperty('month')) {
      const currentMonth = changes.month.currentValue;

      let events = this.eventRepo.getEventsOfMonth(currentMonth);
      this.dayRows = MonthUtils.getDaysOfMonthMatrix(currentMonth, events);
      this.isBgShown = false;
    }
  }

  addEvent(eventText: string, dayNumber: number): void {
    let day = this.getDayByNumber(dayNumber);

    if (Array.isArray(day.events)) {
      day.events.push(eventText);
    } else {
      day.events = [eventText];
    }

    this.eventRepo.addDayEvent(this.month, dayNumber, eventText);
  }

  deleteEvent(eventText: string, dayNumber: number): void {
    let day = this.getDayByNumber(dayNumber);

    if (Array.isArray(day.events)) {
      day.events.splice(day.events.indexOf(eventText), 1);
    } else {
      throw new Error(`There is no event "${eventText}" for day ${dayNumber}`);
    }

    this.eventRepo.removeDayEvent(this.month, dayNumber, eventText);
  }

  private getDayByNumber(dayNumber: number): IDay {
    return this.dayRows.reduce((res, row) =>
      res ? res : row.find(d => d.isThisMonth && d.dayNumber === dayNumber)
      , undefined);
  }
}
