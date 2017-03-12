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
  @Output() onEventAdded = new EventEmitter();
  @Output() onEventDeleted = new EventEmitter();

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

  addEvent(event: KeyboardEvent, textarea: any): void {
    if (event.keyCode === 13 && event.ctrlKey && textarea.value) {
      this.onEventAdded.emit(textarea.value);
      textarea.value = '';
    }
  }

  deleteEvent(eventText: string): void {
    this.onEventDeleted.emit(eventText);
  }
}
