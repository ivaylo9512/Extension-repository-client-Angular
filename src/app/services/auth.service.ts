import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn : boolean;

  constructor(private httpClient : HttpClient, private router : Router) { 
    this.isLoggedIn = localStorage.getItem('Authorization') !== null ? true : false
  }

  login(username, password) {
    return this.httpClient.post('/login', {
      username,
      password
    })
  }
  logout() {
    localStorage.removeItem('Authorization')
  }
}

