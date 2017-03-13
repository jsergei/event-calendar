import { IDay } from './iday';

export class MonthUtils {

  static getDaysOfWeek(): string[] {
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }

  static daysInWeekNum = 7;

  static getFirstDayInMonth(month: Date): number {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  }

  static getNumDaysInMonth(month: Date): number {
    return new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
  }

  static getPreviousMonth(month: Date): Date {
    return new Date(new Date(month).setMonth(month.getMonth()-1));
  }

  static getNextMonth(month: Date): Date {
    return new Date(new Date(month).setMonth(month.getMonth()+1));
  }

  static getDaysOfMonthMatrix(month: Date, events: {[propName: string]: string[]}): IDay[][] {
    const days = MonthUtils.getDaysOfMonthWithEvents(month, events);
    const firstDay = MonthUtils.getFirstDayInMonth(month);
    const activeDaysFirstRow = MonthUtils.daysInWeekNum - firstDay;

    let firstRow = days.slice(0, activeDaysFirstRow);

    if (firstRow.length < MonthUtils.daysInWeekNum) {
      const prevDaysNum = MonthUtils.getNumDaysInMonth(MonthUtils.getPreviousMonth(month));
      let prevDays = new Array<IDay>();
      for (let i = 1; i <= firstDay; i++) {
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
    const fullRowsNum = Math.floor((days.length - activeDaysFirstRow) / MonthUtils.daysInWeekNum);
    for (let i = 0; i < fullRowsNum; i++) {
      const rowDaysStart = activeDaysFirstRow + i * MonthUtils.daysInWeekNum;
      let fullRow = days.slice(rowDaysStart, rowDaysStart + MonthUtils.daysInWeekNum);
      rows.push(fullRow);
    }

    const firstAndMiddleRowsNum = activeDaysFirstRow + MonthUtils.daysInWeekNum * fullRowsNum;
    if (firstAndMiddleRowsNum < days.length) {
      let lastRow = days.slice(firstAndMiddleRowsNum);
      if (lastRow.length < MonthUtils.daysInWeekNum) {
        const inactiveDaysNum = MonthUtils.daysInWeekNum - lastRow.length;
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

  private static getDaysOfMonthWithEvents(month: Date, events: {[propName: string]: string[]}): IDay[] {
    const daysInMonth = MonthUtils.getNumDaysInMonth(month);
    const days = new Array<IDay>(daysInMonth);
    for (let i = 1; i <= daysInMonth; i++) {
      days[i-1] = {
        dayNumber: i,
        isThisMonth: true,
        events: null
      };
    }

    for (let eventKey of Object.keys(events)) {
      let day = days.find(d => d.dayNumber === +eventKey);
      day.events = events[eventKey];
    }

    return days;
  }
}
