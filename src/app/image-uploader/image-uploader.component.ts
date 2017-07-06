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
import { GifsService } from ".././gifs.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

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
  public imagesToUpload: Array<File>;
  public gifs: any;
  public imagesToRemove: any;
  public closeResult: string;
  public previewUrl: string;
  constructor(
    private _fb: FormBuilder,
    private imageService: ImageService,
    private http: Http,
    private gifsService: GifsService
  ) {
    this.imagesToUpload = [];
    this.imagesToRemove = new Set([]);
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
    this.gifsService.getAllGifs().subscribe(images => {
      let gifs: Array<string> = images.sort(
        (a, b) => b.meta.created - a.meta.created
      );
      this.gifs = gifs;
    });
  }
  upload() {
    this.imageService
      .makeFileRequest("/imageupload/upload", [], this.imagesToUpload)
      .subscribe(images => {
        let gifs: Array<string> = images.sort(
          (a, b) => b.meta.created - a.meta.created
        );
        this.gifs = gifs;
        console.log(gifs);
      });
  }
  remove() {
    let request = Array.from(this.imagesToRemove);
    this.imageService
      .makeRequest("/imageupload/remove", [], request as Array<string>)
      .subscribe(images => {
        let gifs: Array<string> = images.sort(
          (a, b) => b.meta.created - a.meta.created
        );
        this.gifs = gifs;
      });
  }
  fileChangeEvent(fileInput: any) {
    this.imagesToUpload = <Array<File>>fileInput.target.files;
    if (fileInput.target.files && fileInput.target.files[0]) {
      let reader = new FileReader();
      reader.onload = event => {
        this.previewUrl = event.target["result"];
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  removeImageList(id) {
    if (this.imagesToRemove.has(id)) {
      this.imagesToRemove.delete(id);
    } else {
      this.imagesToRemove.add(id);
    }
  }
}
