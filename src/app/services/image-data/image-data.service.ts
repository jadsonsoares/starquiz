import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  constructor(private _http: HttpClient) { }

  get() {
    return this._http.get('/assets/star_images.json');
  }
}
