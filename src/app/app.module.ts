import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';


import { AppComponent }  from './app.component';
import { AppContainerComponent } from './app-container.component';
import { MonthSwitcherComponent }  from './month-switcher.component';
import { CalendarComponent }  from './calendar.component';
import { DayComponent }  from './day.component';

import { RouteParamReader } from './route-param-reader';

const defaultRouteParams = RouteParamReader.monthToRouteParams(RouteParamReader.getDefaultDate());

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: `/date/${defaultRouteParams[0]}/${defaultRouteParams[1]}`,
        pathMatch: 'full'
      },
      {
        path: 'date/:year/:month',
        component: AppContainerComponent
      },
      {
        path: '**',
        redirectTo: `/date/${defaultRouteParams[0]}/${defaultRouteParams[1]}`,
      }
    ])
  ],
  declarations: [
    AppComponent,
    AppContainerComponent,
    MonthSwitcherComponent,
    CalendarComponent,
    DayComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
