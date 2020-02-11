import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.less']
})
export class HeadComponent implements OnInit {
  @Input() head: Object;
  @Input() editable: boolean;

  editableImage: boolean;

  constructor() { }

  ngOnInit() {
  }

}
