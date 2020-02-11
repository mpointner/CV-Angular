import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ItemComponent} from "../item/item.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {
  @Input() editable: boolean;
  @Input() category: Object;
  @Input() i: number;
  @Input() j: number;
  @Output() deleteCategoryEmitter = new EventEmitter<Object>();
  @Input() color: number;

  categoryIsArray: boolean;

  constructor() {
  }

  ngOnInit() {
    this.categoryIsArray = Array.isArray(this.category['item']);
    if(this.category["title"] === "" && this.category["icon"] === "") {
      this.editable = true;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.category["item"], event.previousIndex, event.currentIndex);
  }

  edit() {
    this.editable = !this.editable;
  }

  deleteCategory() {
    this.deleteCategoryEmitter.emit({column: this.i, category: this.j});
  }

  deleteItem(key) {
    const length = this.categoryIsArray ? this.category["item"].length : (this.category["item"] !== null ? 1 : 0);
    for (let i = parseInt(key); i < length - 1; i++) {
      this.category["item"][i] = this.category["item"][i + 1];
    }
    this.category["item"].pop();
  }

  add() {
    var item = {attributes: {name: ""}, location: "", date: "", description: ""};
    if (this.categoryIsArray) {
      this.category["item"].unshift(item);
    } else {
      this.category["item"] = new Array(item, this.category["item"]);
    }
    this.categoryIsArray = Array.isArray(this.category['item']);
    this.category['item'][this.category['item'].length-1].editable = true;
  }
}
