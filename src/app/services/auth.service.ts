import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn : boolean
  isAdmin : boolean
  id : number

  constructor(private httpClient : HttpClient) { 
    this.isLoggedIn = localStorage.getItem('Authorization') !== null ? true : false
    this.isAdmin = JSON.parse(localStorage.getItem('user'))['authorities'][0]['authority'] === 'ROLE_ADMIN' ? true : false
    this.id = JSON.parse(localStorage.getItem('user'))['id']
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
  setUserDetails(user){
      this.isLoggedIn = true
      this.isAdmin = user['authorities'][0]['authority'] === 'ROLE_ADMIN' ? true : false
      this.id = user['id']

  }
}

