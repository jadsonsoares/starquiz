import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer-countdown',
  templateUrl: './timer-countdown.component.html',
  styleUrls: ['./timer-countdown.component.scss']
})
export class TimerCountdownComponent implements OnInit, OnDestroy, OnChanges {

  @Input() startTimer: Boolean = false;
  @Output() endTimer = new EventEmitter();

  intervalId = 0;
  message = '';
  seconds = 120;

  clearTimer() {
    clearInterval(this.intervalId);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  ngOnChanges(ch) {
    if (ch.startTimer.currentValue) {
      this.start();
    }
  }

  start() {
    this.countDown();
  }

  stop() {
    this.clearTimer();
    this.message = `Time is over`;
    this.endTimer.emit(true);
  }

  countDown() {
    this.clearTimer();

    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;

      if (this.seconds === 0) {
        this.message = 'Blast off!';
        this.stop();
      } else {
        if (this.seconds < 0) {
          this.seconds = 120;
        } // reset

        this.message = this.formatTimer();
      }
    }, 1000);
  }

  formatTimer() {
    const min = Math.floor(this.seconds / 60);

    let sec = this.seconds > 60 ? this.seconds - 60 : this.seconds;

    sec = sec === 60 ? 0 : sec;

    const sec_text = sec < 10 ? `0${sec}` : `${sec}`;

    return `0${min} : ${sec_text}`;
  }
}
