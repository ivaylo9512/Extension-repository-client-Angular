import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { ExtensionsService } from '../services/extensions.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { MouseWheelDirective } from '../helpers/mouse-wheel.directive';
import { FavExtensionsComponent } from '../fav-extensions/fav-extensions.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@NgModule({
  declarations: [
    ProfileComponent,
    FavExtensionsComponent
  ],
  imports: [
    BrowserModule,
  ],
})
export class HomeComponent implements OnInit {


  constructor(private authService : AuthService) {
  }

  ngOnInit() {
  }

}
