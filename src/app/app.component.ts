import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  defaultLang = 'pt-br';
  start_quiz  = false;

  constructor(public translate: TranslateService) {
    translate.setDefaultLang(this.defaultLang);
    translate.use(this.defaultLang);
  }

  ngOnInit() {

  }

  startQuiz(event) {
    this.start_quiz = true;
  }

  changeLang(event) {
    this.defaultLang = event;
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.defaultLang);
  }
}
