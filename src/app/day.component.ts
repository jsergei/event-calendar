import { Component, Input } from '@angular/core';
import { IDay } from './iday';

var module: any;

@Component({
  selector: 'day',
  moduleId: module.id,
  templateUrl: './day.component.html',
  styleUrls: [ './day.component.css']
})
export class DayComponent {
  @Input() data: IDay;
  isEditorShown: boolean;

  showEditor(): void {
    if (this.data.isThisMonth) {
      this.isEditorShown = !this.isEditorShown;
    }
  }
}
