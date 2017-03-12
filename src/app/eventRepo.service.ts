import { Injectable } from '@angular/core';

import { IDay } from './iday';
import { StorageService } from './storage.service';

@Injectable()
export class EventRepoService {
  constructor(private storage: StorageService) {}

  getEventsOfMonth(month: Date): {[propName: string]: string[]} {
    const path = this.getMonthPath(month);
    const days = this.storage.readObject<{[propName: string]: string[]}>(path);
    return typeof days === "object" ? days : {};
  }

  addDayEvent(month: Date, dayNumber: number, event: string): void {
    let monthEvents = this.getEventsOfMonth(month);

    const day = monthEvents[dayNumber];
    if (!Array.isArray(day)) {
      monthEvents[dayNumber] = [event];
    } else {
      day.push(event);
    }

    const path = this.getMonthPath(month);
    this.storage.writeObject(path, monthEvents);
  }

  removeDayEvent(month: Date, dayNumber: number, event: string): void {
    let monthEvents = this.getEventsOfMonth(month);
    const path = this.getMonthPath(month);

    const day = monthEvents[dayNumber];
    if (!Array.isArray(day) || day.indexOf(event) < 0) {
      console.error('cannot remove an event that does not exit: path' + path + ', day: ' + dayNumber);
    } else {
      day.splice(day.indexOf(event), 1);
      if (day.length === 0) {
        delete monthEvents[dayNumber];
      }
    }

    if (Object.keys(monthEvents).length === 0) {
      this.storage.remove(path);
    } else {
      this.storage.writeObject(path, monthEvents);
    }
  }

  private getMonthPath(month: Date) : string {
    return month.getFullYear() + "." + month.getMonth();
  }
}
