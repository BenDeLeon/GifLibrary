import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts.service';
import { ImageService } from './images.service';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
  path:'image-upload',
  component: ImageUploaderComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    ImageUploaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),    
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers:  [PostsService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
