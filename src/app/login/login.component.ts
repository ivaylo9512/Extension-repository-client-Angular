import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error : string;

  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.auth.login("Robocop", "password").subscribe(
      data => {
        localStorage.setItem('Authorization', data['token'])
        this.auth.isLoggedIn = true
      },
      err  => this.error = err['error']
    );
  }

}
