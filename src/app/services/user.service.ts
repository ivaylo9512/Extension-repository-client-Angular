import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
interface User{
  id : number,
  username : String,
  extension : String
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  getUser(id : number){
    return this.httpClient.get<User>(`/api/users/${id}`)
  }

  getAllUsers(){
    this.httpClient.get<User>('/api/auth/users/all')
  }

  disableUser(id : number, state : string){
    this.httpClient.patch('api/auth/users/disable/${id}/${state}', null)
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
