import { Character } from './swapi.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  endpoint = 'https://swapi.co/api';

  constructor(private _http: HttpClient) { }

  get(path) {

    const url = `${this.endpoint}/${path}`;

    return this._http.get<SwapiResult>(url);
  }

  get_by_url(path) {
    return this._http.get<SwapiResult>(path);
  }
}

export interface Character {
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: number;
  homeworld: string;
  homeworld_text: string;
  mass: number;
  name: string;
  skin_color: string;
  species: Array<string>;
  image: string;
  films: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
  is_correct: Boolean;
}

export interface SwapiResult {
  count: number;
  next: string;
  previous: string;
  results: Array<Character>;
}
