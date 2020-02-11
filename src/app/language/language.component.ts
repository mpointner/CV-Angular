import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.less']
})
export class LanguageComponent implements OnInit {
  @Input() document: Object;
  @Input() editable: boolean;

  selectedLanguage: string;

  constructor() { }

  ngOnInit() {
    if(this.document['body'] === undefined) {
      this.selectedLanguage = Object.keys(this.document)[0];
    }
  }

  changeLanguage(language) {
    this.selectedLanguage = language;
  }

}
