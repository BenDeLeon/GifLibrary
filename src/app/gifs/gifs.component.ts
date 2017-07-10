import { Component, OnInit } from "@angular/core";
import { GifsService } from ".././gifs.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-gifs",
  templateUrl: "./gifs.component.html",
  styleUrls: ["./gifs.component.css"]
})
export class GifsComponent implements OnInit {
  gifs: any = [];
  location: string;
  constructor(private gifsService: GifsService) { }

  ngOnInit() {
    this.location = window.location.origin;
    this.gifsService.getAllGifs().subscribe(images => {
      let carouselImages: Array<string> = images.sort((a, b) =>  b.meta.created - a.meta.created);
      this.gifs = carouselImages.slice(0, 10);
    });
    setInterval(() => {
      window.location.reload();
    }, 300000); 
  }
}
