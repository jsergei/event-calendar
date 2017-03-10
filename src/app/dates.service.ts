import { Injectable } from '@angular/core';
import { IDay } from './day';

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

  setCurrentMonth(month: Date): void {
    this.currentMonth = month;
  }

  getDaysOfWeek(): string[] {
    return ['Mon', 'Tue', 'Wed', 'Thy', 'Fri', 'Sat', 'Sun'];
  }

  getMonthName(month: Date): string {
    return this.monthNames[month.getMonth()];
  }

  getDaysOfMonth(month: Date): IDay[] {
    const daysInMonth = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        dayNumber: i,
        isThisMonth: true,
        events: []
      });
    }
    days[10].events = ['walk the dog', 'get to work'];
    days[15].events = ['listen to music'];
    return days;
  }
}
