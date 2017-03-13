import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { RouteParamReader } from './route-param-reader';

@Component({
  selector: 'app-container',
  template: `
  <div class="app-container">
    <month-switcher [month]="selectedMonth"></month-switcher>
    <calendar [month]="selectedMonth"></calendar>
  </div>
`
})
export class AppContainerComponent implements OnInit {
  selectedMonth: Date;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.selectedMonth = RouteParamReader.routeParmsToMonth(params);
    });
  }
}
