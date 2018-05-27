import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() started = new EventEmitter();
  @Output() lang = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  start() {
    this.started.emit(true);
  }

  changeLang(lang) {
    this.lang.emit(lang);
  }
}
