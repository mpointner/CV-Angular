import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  @Input() document: Object;
  @Input() editable: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  getColor(i, j) {
    let color = j;
    for (let x = 0; x < i; x++) {
      color += this.document['body']['column'][x]['category'].length;
    }
    //console.log(color+1);
    return color + 1;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(event.container.data['category'], event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data['category'],
        event.container.data['category'],
        event.previousIndex,
        event.currentIndex);
    }
    for (let x = 0; x < this.document['body']['column'].length; x++) {
      if(this.document['body']['column'][x]['category'].length == 0) {
        this.document['body']['column'].splice(x, 1);
      }
    }
  }

  deleteCategory(obj) {
    /*
    const length = Array.isArray(this.document['body']['column'][column]['category']) ? this.document['body']['column'][column]['category'].length : (this.document['body']['column'][column]['category'] !== null ? 1 : 0);
    for (let cat = parseInt(category); cat < length - 1; cat++) {
      this.document['body']['column'][column]['category'][cat] = this.document['body']['column'][column]['category'][cat+1];
    }
    */
    this.document['body']['column'][obj['column']]['category'].splice(obj['category'], 1);
    if (this.document['body']['column'][obj['column']]['category'].length === 0) {
      this.document['body']['column'].splice(obj['column'], 1);
      //console.log("Last category of column");
    }
    //console.log(this.document['body']['column']);
  }

  addCategory(column) {
    const item = {attributes: {title: "", icon: ""}, item: [{attributes: {name: ""}, location: "", date: "", description: ""}]};
    if (Array.isArray(this.document['body']['column'][column]['category'])) {
      this.document['body']['column'][column]['category'].push(item);
    } else {
      this.document['body']['column'][column]['category'] = new Array(item, this.document['body']['column'][column]['category']);
    }
  }

  addColumn() {
    const column = {category: [{attributes: {title: "", icon: ""}, item: [{attributes: {name: ""}, location: "", date: "", description: ""}]}]};
    if (Array.isArray(this.document['body']['column'])) {
      this.document['body']['column'].push(column);
    } else {
      this.document['body']['column'] = new Array(this.document['body']['column'], column);
    }
    //console.log(this.document['body']['column']);
  }

}
