import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScoreDao } from './../../services/score/score.dao';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit, OnChanges {

  @Input() score_total = 0;
  @Output() playAgain = new EventEmitter();

  form: FormGroup;
  score_list = [];
  img_result = '';
  title      = '';
  saved      = false;
  showScore  = false;

  constructor(private _formBuilder: FormBuilder, private _dao: ScoreDao) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnChanges() {
    this.defineImage();
  }

  defineImage() {
    if (this.score_total === 0) {

      this.img_result = '/assets/image/score_0.jpg';
      this.title = 'score_0';

    } else if (this.score_total < 174) {

      this.img_result = '/assets/image/score_1.jpg';
      this.title = 'score_1';

    } else if (this.score_total < 348) {

      this.img_result = '/assets/image/score_2.jpg';
      this.title = 'score_2';

    } else if (this.score_total < 522) {

      this.img_result = '/assets/image/score_3.jpg';
      this.title = 'score_3';

    } else if (this.score_total < 696) {

      this.img_result = '/assets/image/score_4.jpg';
      this.title = 'score_4';

    } else if (this.score_total < 870) {

      this.img_result = '/assets/image/score_5.jpg';
      this.title = 'score_5';

    } else {

      this.img_result = '/assets/image/score_6.jpg';
      this.title = 'score_6';

    }
  }

  onPlayAgain(event) {
    this.saved     = false;
    this.showScore = false;

    this.form.reset();

    this.playAgain.emit(true);
  }

  onSubmit() {
    const data = this.form.value;

    data.score = this.score_total;

    this._dao.save(data);

    this.saved = true;

    this.onShowScore(new EventEmitter());
  }

  onShowScore(event) {
    this.showScore = true;

    this.score_list = this._dao.get();
  }

  onHideScore(event) {
    this.showScore = false;
  }
}
