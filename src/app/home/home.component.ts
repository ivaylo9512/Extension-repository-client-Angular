import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service'

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { FavExtensionsComponent } from '../fav-extensions/fav-extensions.component';
import { Router, NavigationEnd } from '@angular/router';

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

  isProfileRoute : boolean
  routeSubscription

  constructor(private authService : AuthService, private router: Router) {
    this.routeSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
          this.isProfileRoute = e.urlAfterRedirects != '/home'
      }
    });
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.routeSubscription) {  
       this.routeSubscription.unsubscribe();
    }
  }

}
