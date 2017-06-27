import { Component, OnInit } from "@angular/core";
import { PostsService } from "../posts.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  posts: any = [];
  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getAllPosts().subscribe(images => {
      let carouselImages: Array<string> = images.sort((a, b) =>  b.meta.created - a.meta.created);
      this.posts = carouselImages.slice(0, 10);
    });
  }
}
