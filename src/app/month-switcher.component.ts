import { Component, Input } from '@angular/core';
import { Router }   from '@angular/router';
import { MonthUtils } from './month-utils';

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
    var prevMonth = MonthUtils.getPreviousMonth(this.month);
    this.router.navigate(['/date', prevMonth.getFullYear(), prevMonth.getMonth()+1]);
  }

  setNext(): void {
    var nextMonth = MonthUtils.getNextMonth(this.month);
    this.router.navigate(['/date', nextMonth.getFullYear(), nextMonth.getMonth()+1]);
  }
}
