import { Component } from '@angular/core';
import {ApiService} from "./api.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Observable} from "rxjs";
import {async} from "@angular/core/testing";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  editable: boolean = false;
  document: Object = null;

  constructor(private apiService: ApiService) {
    apiService.getData().subscribe(data => {
      //console.log(data);
      let xmlString = data.toString();
      //console.log(xmlString);
      this.document = apiService.getDataString(xmlString);
    });;
    console.log("AppComponent constructor:");
  }

  ngOnInit() {
  }

  getEditButtonValue() {
    return this.editable ? "Finish editing all" : "Edit all";
  }

  fileChanged(e) {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let fileContent = fileReader.result;
      //console.log(fileContent);
      let tmpDoc = this.apiService.getDataString(fileContent);
      //console.log(tmpDoc);
      this.document = tmpDoc;
    }
    fileReader.onerror = function(err) {
      console.log(err, err.loaded
        , err.loaded === 0
        , file);
    }
    fileReader.readAsText(file);
  }
}
