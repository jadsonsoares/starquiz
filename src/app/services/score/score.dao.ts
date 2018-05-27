import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreDao {

  constructor() {}

  save(data) {
    const score_list = this.get() || [];

    score_list.push(data);

    score_list.sort((a, b) => {
      return b.score - a.score;
    });

    localStorage.setItem('score', JSON.stringify(score_list));
  }

  get() {
    return JSON.parse(localStorage.getItem('score'));
  }
}
