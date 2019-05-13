import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { ExtensionsService } from '../services/extensions.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn : boolean;

  constructor(private authService : AuthService, private extensionsService : ExtensionsService ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn

  }

}
