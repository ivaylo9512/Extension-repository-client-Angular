import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn : boolean;

  constructor(private httpClient : HttpClient) { 
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

