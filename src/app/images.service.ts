import { Injectable } from "@angular/core";
import { Headers, RequestOptions, Http } from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ImageService {
  constructor(private http: Http) { }
  makeRequest(url: string, params: Array<string>, imagesToRemove: Array<string>) {
    let request = JSON.stringify({
      ImagesToRemove: imagesToRemove,
    });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(url, request, { headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    let formData: any = new FormData();
    let xhr = new XMLHttpRequest();
    let reader = new FileReader();
    formData.append("file", files[0]);
    let headers = new Headers({});
    return this.http.post("/imageupload/upload", formData, { headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // return new Promise((resolve, reject) => {
    //   let formData: any = new FormData();
    //   let xhr = new XMLHttpRequest();
    //   let reader = new FileReader();
    //   formData.append("file", files[0]);
    //   let headers = new Headers({});
    //   xhr.onreadystatechange = () => {
    //     if (xhr.readyState == 4) {
    //       if (xhr.status == 200) {
    //         resolve(JSON.parse(xhr.response));
    //       } else {
    //         reject(xhr.response);
    //       }
    //     }
    //   }

    //   this.http.post("/imageupload/upload", formData, { headers }).map(res => res.json()).subscribe((data) => console.log(data));
    // });
  }
}
