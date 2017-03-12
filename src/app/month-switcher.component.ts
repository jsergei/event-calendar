import { Component, Input } from '@angular/core';
import { Router }   from '@angular/router';

var module: any;

@Component({
  selector: 'month-switcher',
  moduleId: module.id,
  templateUrl: './month-switcher.component.html',
  styleUrls: [ './month-switcher.component.css']
})
export class MonthSwitcherComponent {
  @Input() month: Date;

  constructor(private router: Router) {}

  setPrev(): void {
    var prevMonth = this.getPreviousMonth(this.month);
    this.router.navigate(['/date', prevMonth.getFullYear(), prevMonth.getMonth()+1]);
  }

  setNext(): void {
    var nextMonth = this.getNextMonth(this.month);
    this.router.navigate(['/date', nextMonth.getFullYear(), nextMonth.getMonth()+1]);
  }

  private getPreviousMonth(month: Date): Date {
    return new Date(new Date(month).setMonth(month.getMonth()-1));
  }

  private getNextMonth(month: Date): Date {
    return new Date(new Date(month).setMonth(month.getMonth()+1));
  }
}
