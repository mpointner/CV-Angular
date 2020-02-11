import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.less']
})
export class EditableFieldComponent implements OnInit {
  @Input() editable: boolean;
  @Input() value: string;
  @Output() valueChange = new EventEmitter();
  @Input() htmlvalue: boolean;
  @Input() showValue: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  change(newValue) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

  finishEditing() {
    this.editable = false;
  }

}
