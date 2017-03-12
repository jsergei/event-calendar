import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() onEditorShown = new EventEmitter();

  isEditorShown: boolean;
  @Input() set isBgShown(value: boolean) {
    if (!value) {
      this.isEditorShown = false;
    }
  }

  inputPlaceholder = "Ctrl + enter - add event";


  showEditor(event: Event): void {
    if (this.data.isThisMonth) {
      this.isEditorShown = true;
      this.onEditorShown.emit(true);
    } else {
      event.stopPropagation();
    }
  }
}
