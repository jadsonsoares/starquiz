import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sabre-load',
  templateUrl: './sabre-load.component.html',
  styleUrls: ['./sabre-load.component.scss']
})
export class SabreLoadComponent implements OnInit, OnChanges {

  loaded = 0;
  toInterval;
  numProg = '';
  widthProg = '';

  @Input() startLoad: Boolean = false;
  @Input() totalItems = 0;
  @Input() currentQty = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(ch) {
    if (ch.startLoad && ch.startLoad.currentValue) {
      setTimeout(() => this.progAnimate(), 1000);
    }
  }

  progAnimate() {
    this.loaded = Math.floor((this.currentQty * 100) / this.totalItems);

    // set this so it never goes above 100
    if (this.loaded >= 100) {
      this.loaded = 100;
    }

    this.widthProg =  `${this.loaded}%`;

    if (this.loaded < 100) {
      this.toInterval = this.randNum(10, 750);
      setTimeout(() => this.progAnimate(), this.toInterval);

    } else {
      // kill it
      setTimeout(function() {
        // começar quiz
      }, 1000);
    }
  }

  randNum(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }
}
