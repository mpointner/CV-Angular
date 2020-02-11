import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class ItemComponent implements OnInit {
  @Input() editable: boolean;
  @Input() item: Object;
  @Input() i: number;
  @Output() deleteItemEmitter = new EventEmitter<number>();

  constructor() {
  }

  /*
  get(name) {
    if(this.item !== undefined) {
      if (this.item[name] !== undefined) {
        return this.item[name];
      } else {
        if (this.item["attributes"] !== undefined && this.item["attributes"][name] !== undefined) {
          return this.item["attributes"][name];
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  }
  */

  getName() {
    return this.item['attributes']['name'];
  }

  ngOnInit() {
    if(this.item['attributes'] !== null && this.item['attributes']["name"] === "" && this.item["date"] === "" && this.item["location"] === "" && this.item["description"] === "") {
      this.editable = true;
    }
  }

  edit() {
    this.editable = !this.editable;
  }

  delete() {
    this.deleteItemEmitter.emit(this.i);
  }

}
