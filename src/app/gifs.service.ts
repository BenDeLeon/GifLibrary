import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class GifsService {

  constructor(private http: Http) {
    }

  getAllGifs() {
    return this.http.get('/imageupload/gifs')
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));;
  }

}
