import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn : boolean = false;

  constructor(private httpClient : HttpClient) { }

  login(username, password) {
    return this.httpClient.post('http://localhost:8090/login', {
      username,
      password
    })
  }
}

