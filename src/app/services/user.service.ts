import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'

interface User{
  id : number,
  username : string,
  extensions : any[],
  isActive : boolean,
  rating : number,
  extensionsRated : number,
  profileImage : string,
  country : string,
  info : string,
  totalExtensions : number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  getUser(id : number){
    return this.httpClient.get<User>(`/api/users/findById/${id}`)
  }

  getAllByState(state : string){
    const params = new  HttpParams().set('state', state)    
    return this.httpClient.get<User[]>('/api/users/auth/all', {params})
  }

  getGithubSettings(){
    return this.httpClient.get('/api/github/auth')
  }

  setGithubSettings(github){
    return this.httpClient.post('/api/github/auth', github)
  }

  setState(id : number, state : string){
    return this.httpClient.patch<User>(`/api/users/auth/setState/${id}/${state}`, null)
  }

  changePassword(password : string, repeatPassword : string){
    this.httpClient.patch('/api/users/auth/changePassword',{
      password,
      repeatPassword
    })
  }

  register(formData : FormData){
    return this.httpClient.post('/api/users/register', formData)
  }
}
