import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error : string;

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit() {
  }

  login(userForm : NgForm) {
    const username =  userForm.controls['username'].value
    const password = userForm.controls['password'].value
    this.auth.login(username, password).subscribe(
      data => {
        localStorage.setItem('Authorization', data['token'])
        this.auth.isLoggedIn = true
        this.router.navigate(['home'])

      },
      err  => this.error = err['error']
    );
  }

}