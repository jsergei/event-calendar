import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';


import { AppComponent }  from './app.component';
import { AppContainerComponent } from './app-container.component';
import { MonthSwitcherComponent }  from './month-switcher.component';
import { CalendarComponent }  from './calendar.component';
import { DayComponent }  from './day.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: `/date/${new Date().getFullYear()}/${new Date().getMonth()+1}`, pathMatch: 'full' },
      { path: 'date/:year/:month', component: AppContainerComponent }
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
