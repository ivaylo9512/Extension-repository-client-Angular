import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error;

  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.auth.login("Robocop1", "password").subscribe(
      data =>{
        localStorage.setItem('Authorization', data['token'])
        this.auth.isLoggedIn = true
      },
      err  => this.error = err['error']
    );
  }

}
