import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn : boolean
  isAdmin : boolean
  id : number
  username : string

  constructor(private httpClient : HttpClient, private router : Router) { 
    if(localStorage.getItem('user') !== null && localStorage.getItem('Authorization') !== null){
      const user = JSON.parse(localStorage.getItem('user'))
      this.isLoggedIn = true
      this.isAdmin = user['authorities'][0]['authority'] === 'ROLE_ADMIN' ? true : false
      this.id = user['id']
      this.username = user['username']
    }else{
      this.isLoggedIn = false
      this.isAdmin = false
      this.id = 0
    }
  }

  login(username, password) {
    return this.httpClient.post('/login', {
      username,
      password
    })
  }
  logout() {
    localStorage.removeItem('Authorization')
    localStorage.removeItem('user')
    this.isLoggedIn = false
    this.isAdmin = false
    this.router.navigate(['login'])
  }
  setUserDetails(user){
      this.isLoggedIn = true
      this.isAdmin = user['authorities'][0]['authority'] === 'ROLE_ADMIN' ? true : false
      this.username = user['username']
      this.id = user['id']
  }
}

