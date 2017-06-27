import { Component, OnInit } from "@angular/core";
import { Headers, RequestOptions, Http } from "@angular/http";

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import { UserImage } from "./image-interface";
import { Observable } from "@angular/core/src/facade/async";
import { ImageService } from "../images.service";

@Component({
  selector: "app-image-uploader",
  templateUrl: "./image-uploader.component.html",
  styleUrls: ["./image-uploader.component.css"]
})
export class ImageUploaderComponent implements OnInit {
  public myForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  public imageList: FileList;
  public filesToUpload: Array<File>;
  public m1: any;
  constructor(private _fb: FormBuilder, private imageService: ImageService, private http: Http) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      name: ["", [<any>Validators.required, <any>Validators.minLength(5)]],
      fileList: [""],
      address: this._fb.group({
        street: ["", <any>Validators.required],
        postcode: [""]
      })
    });
  }asd
  upload() {
    this.makeFileRequest("/imageupload/upload", [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) =>{
        console.log(error);
    });
  }
  fileChangeEvent(fileInput: any) {
    this.m1 = fileInput.target;
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            var reader = new FileReader();
            // for(var i = 0; i < files.length; i++) {
            //     formData.append("uploads[]", files[i], files[i].name);
            //                 console.log(files[i]);

            // }
                            formData.append("file", files[0]);

     let headers = new Headers({});           
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            this.http.post("/imageupload/upload", formData, {headers}).map(res => res.json()).subscribe((data) => console.log(data));

        });
    }

}
