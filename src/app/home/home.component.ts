import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { ExtensionsService } from '../services/extensions.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
  ],
})
export class HomeComponent implements OnInit {

  isLoggedIn : boolean;
  extensions : any;

  constructor(private authService : AuthService, private extensionsService : ExtensionsService ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn

    this.extensionsService.getFeatured().subscribe(data => {
      this.extensions = data;
    })
  }

}
