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

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
  }

  login(userForm : NgForm) {
    const username =  userForm.controls['username'].value
    const password = userForm.controls['password'].value
    this.authService.login(username, password).subscribe(
      data => {
        localStorage.setItem('Authorization', data['token'])
        localStorage.setItem('user', JSON.stringify(data))
        this.authService.isLoggedIn = true
        this.authService.isAdmin = data['authorities'][0]['authority'] === 'ROLE_ADMIN' ? true : false

        this.router.navigate(['home'])

      },
      err  => this.error = err['error']
    );
  }

}
