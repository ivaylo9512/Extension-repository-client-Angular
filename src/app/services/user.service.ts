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
  info : string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  getUser(id : number){
    return this.httpClient.get<User>(`/api/users/${id}`)
  }

  getAllByState(state : string){
    const params = new  HttpParams().set('state', state)    
    return this.httpClient.get<User[]>('/api/auth/users/all', {params})
  }
  getGithubSettings(){
    return this.httpClient.get('/api/auth/github')
  }
  setGithubSettings(github){
    return this.httpClient.post('/api/auth/github', github)
  }
  setState(id : number, state : string){
    return this.httpClient.patch<User>(`/api/auth/users/setState/${id}/${state}`, null)
  }

  changePassword(password : string, repeatPassword : string){
    this.httpClient.patch('/auth/changePassword',{
      password,
      repeatPassword
    })
  }
  register(formData : FormData){
    return this.httpClient.post('/api/users/register', formData)
  }
}
