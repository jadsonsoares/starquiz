import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ImageDataService } from './../services/image-data/image-data.service';
import { Character, SwapiService, SwapiResult } from './../services/swapi/swapi.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnChanges {

  @Input() startLoad = false;
  @Input() playing   = false;

  characters: Array<Character> = [];
  nextPage: string;
  score: any = {};

  p           = 0;
  score_total = 0;
  totalItems  = 0;
  possLoad    = 0;
  endLoad     = false;
  showScore   = false;

  constructor(
    private _service: SwapiService,
    private _serviceImage: ImageDataService) { }

  ngOnInit() {

    this._service.get('people').subscribe((res: SwapiResult) => {
      console.log(res);

      this.characters = res.results;
      this.totalItems = res.count;
      this.possLoad = this.possLoad + res.results.length;
      this.nextPage = res.next;

      this.getPagination();
    });
  }

  ngOnChanges(ch) {
    if (ch.playing.currentValue) {
      this.showLoading();
    }
  }

  showLoading() {
    if (this.characters.length > 0) {

      this.startLoad = true;

    } else {

      setTimeout(() => this.showLoading(), 300);

    }
  }
  getPagination() {
    if (this.nextPage !== '') {
      this._service.get_by_url(this.nextPage).subscribe((res: SwapiResult) => {
        console.log(res);

        this.possLoad = this.possLoad + res.results.length;

        res.results.forEach(character => this.characters.push(character));
        this.nextPage = res.next ? res.next : '';

        this.getPagination();
      });

    } else {

      this.getCharacterImage();

    }
  }

  getCharacterImage() {

    this.characters.forEach((character, index) => {
      let image_name = character.name.replace('é', 'e');
      image_name = image_name.replace(/ /g, '-');

      this.characters[index].image = '/assets/image/character/'  + image_name + '.jpg';
    });

    this.endLoad = true;
  }

  addScore(event) {
    const data = event.split('%%');

    this.score[data[0]] = data[1];

    this.characters.forEach((character, index) => {
      if (character.name === data[0]) {
        this.characters[index].is_correct = true;
      }
    });
  }

  endQuiz(event) {
    if (event) {

      this.playing = false;

      console.log(this.score);
      // tslint:disable-next-line:forin
      for (const el in this.score) {
        console.log(el);
        this.score_total = this.score_total + parseInt(this.score[el]);

      }

      this.showScore = true;

    }
  }

  onPlayAgain(event) {
    this.characters.forEach((character, index) => {

      this.characters[index].is_correct = false;

    });

    this.playing = true;
    this.showScore = false;
    this.p = 0;
  }

  showQuiz() {
    if ( !this.showScore && !this.endLoad) {

      return true;

    } else if (!this.showScore && this.endLoad) {

      return false;

    }

    return this.showScore;

  }
}
