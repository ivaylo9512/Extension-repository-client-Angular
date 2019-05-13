import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENGINE_METHOD_DIGESTS } from 'constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn : boolean;

  constructor(private httpClient : HttpClient) { 
    localStorage.removeItem('Authorization')
    this.isLoggedIn = localStorage.getItem('Authorization') !== null ? true : false
    console.log(this.isLoggedIn)
  }

  login(username, password) {
    return this.httpClient.post('http://localhost:8090/login', {
      username,
      password
    })
  }
  logout() {
    localStorage.removeItem('Authorization')
}
}

