import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Character, SwapiService } from './../../services/swapi/swapi.service';
import { NgbCarouselConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit, OnChanges {

  has_details = false;
  is_correct = false;
  used_help = false;
  charName: string;

  @Input() character: Character;
  @Input() cleaing: Boolean;
  @Output() completed = new EventEmitter();

  constructor(
    config: NgbCarouselConfig,
    private _service: SwapiService,
    private modalService: NgbModal) {

    config.interval = 300000;

  }

  ngOnInit() {
    if (this.character.is_correct) {

      this.charName = this.character.name;
      this.is_correct = true;

    }
  }

  ngOnChanges(ch) {
    if (ch.cleaing.currentValue) {
      this.is_correct = false;
      this.used_help = false;
      this.charName = '';
    }
  }

  getDetails() {
    this._service.get_by_url(this.character.homeworld)
      .subscribe((res: any) => {
        this.character.homeworld_text = res.name;
    });

    this.character.species =  this.getDetailArray(this.character.species, 'name');
    this.character.films =  this.getDetailArray(this.character.films, 'title');
    this.character.vehicles =  this.getDetailArray(this.character.vehicles, 'name');
    this.character.starships =  this.getDetailArray(this.character.starships, 'name');
  }

  getDetailArray(data: Array<string>, field: string): Array<string> {
    const list: Array<string> = [];

    data.forEach(el => {
      this._service.get_by_url(el)
        .subscribe((res: any) => {
          list.push(res[field]);
      });
    });

    return list;
  }

  open(content) {
    if (!this.has_details) {
      this.getDetails();
      this.has_details = true;
    }

    this.used_help = true;

    this.modalService.open(content, { size: 'lg', centered: true });
  }

  youKnow(event) {
    if (this.charName.toLowerCase() === this.character.name.toLowerCase()) {

      this.is_correct = true;
      this.completed.emit(`${this.character.name}%%${this.value()}`);

    } else {

      this.completed.emit(`${this.character.name}%%0`);
      this.is_correct = false;

    }
  }

  value() {
    return this.used_help ? 5 : 10;
  }

  closeDetail(event) {

  }
}
