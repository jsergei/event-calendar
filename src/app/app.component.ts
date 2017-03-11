import { Component, OnInit } from '@angular/core';
import { DatesService } from './dates.service';
import { IDay } from './day';

var module: any;

@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css'],
  providers: [DatesService]
})
export class AppComponent implements OnInit {
  monthName: string;
  daysOfWeek: string[];
  dayRows: IDay[][];

  constructor(private datesService: DatesService) { }

  ngOnInit(): void {
    let currentMonth = this.datesService.getCurrentMonth();

    this.monthName = this.datesService.getMonthName(currentMonth);
    this.daysOfWeek = this.datesService.getDaysOfWeek();
    this.dayRows = this.datesService.getDaysOfMonthMatrix(currentMonth);
  }
}
