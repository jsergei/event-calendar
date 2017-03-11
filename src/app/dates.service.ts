import { Injectable } from '@angular/core';
import { IDay } from './iday';

@Injectable()
export class DatesService {
  private currentMonth = new Date(2017, 5, 1);
  private monthNames =[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  getCurrentMonth(): Date {
    return this.currentMonth;
  }

  setPrevMonth(): void {
    this.currentMonth = this.getPreviousMonth(this.currentMonth);
  }

  setNextMonth(): void {
    this.currentMonth = this.getNextMonth(this.currentMonth);
  }

  getDaysOfWeek(): string[] {
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }

  getMonthName(): string {
    return this.monthNames[this.currentMonth.getMonth()] + ' ' + this.currentMonth.getFullYear();
  }

  getDaysOfMonthMatrix(): IDay[][] {
    const month = this.currentMonth;
    const days = this.getDaysOfMonth(month);
    const firstDay = this.getFirstDayInMonth(month);
    const activeDaysFirstRow = 7 - firstDay;

    let firstRow = days.slice(0, activeDaysFirstRow);

    if (firstRow.length < 7) {
      const prevDaysNum = this.getNumDaysInMonth(this.getPreviousMonth(month));
      let prevDays = new Array<IDay>();
      for (let i = 0; i < firstDay; i++) {
        prevDays.push({
          dayNumber: prevDaysNum - firstDay + i,
          isThisMonth: false,
          events: null
        });
      }
      firstRow = prevDays.concat(firstRow);
    }

    let rows = new Array<IDay[]>();
    rows.push(firstRow);
    const fullRowsNum = Math.floor((days.length - activeDaysFirstRow) / 7);
    for (let i = 0; i < fullRowsNum; i++) {
      const rowDaysStart = activeDaysFirstRow + i * 7;
      let fullRow = days.slice(rowDaysStart, rowDaysStart + 7);
      rows.push(fullRow);
    }

    const firstAndMiddleRowsNum = activeDaysFirstRow + 7 * fullRowsNum;
    if (firstAndMiddleRowsNum < days.length) {
      let lastRow = days.slice(firstAndMiddleRowsNum);
      if (lastRow.length < 7) {
        const inactiveDaysNum = 7 - lastRow.length;
        for (let i = 1; i <= inactiveDaysNum; i++) {
          lastRow.push({
            dayNumber: i,
            isThisMonth: false,
            events: null
          });
        }
      }
      rows.push(lastRow);
    }

    return rows;
  }

  private getDaysOfMonth(month: Date): IDay[] {
    const daysInMonth = this.getNumDaysInMonth(month);
    const days = new Array<IDay>(daysInMonth);
    for (let i = 1; i <= daysInMonth; i++) {
      days[i-1] = {
        dayNumber: i,
        isThisMonth: true,
        events: null
      };
    }
    days[10].events = ['walk the dog', 'get to work'];
    days[15].events = ['listen to music'];
    return days;
  }

  private getFirstDayInMonth(month: Date): number {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  }

  private getNumDaysInMonth(month: Date): number {
    return new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
  }

  private getPreviousMonth(month: Date): Date {
    return new Date(new Date(month).setMonth(month.getMonth()-1));
  }

  private getNextMonth(month: Date): Date {
    return new Date(new Date(month).setMonth(month.getMonth()+1));
  }
}
