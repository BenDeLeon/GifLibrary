import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GifsComponent } from './posts/gifs.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

import { GifsService } from './gifs.service';
import { ImageService } from './images.service';


const ROUTES = [
  {
    path: '',
    redirectTo: 'gifs',
    pathMatch: 'full'
  },
    {
    path: 'image-upload',
    component: ImageUploaderComponent
  },
  {
    path: 'gifs',
    component: GifsComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    ImageUploaderComponent,
    GifsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),    
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers:  [GifsService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
