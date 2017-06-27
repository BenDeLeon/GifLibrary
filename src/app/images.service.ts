import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ImageService {
  constructor(private http: Http) {}

  // uploadImages(formData, options) {
  //   return this.http
  //     .post("/imageupload", formData, options)
  //     .map(res => res.json());
  // }
}
