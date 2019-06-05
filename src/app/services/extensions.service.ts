import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

interface Extension {
  name : string
  cover : string
}
@Injectable({
  providedIn: 'root'
})
export class ExtensionsService {

  constructor(private httpClient : HttpClient) { 
  }

  getFeatured(){
    return this.httpClient.get<Extension>('/api/extensions/featured')
  }
  getExtension(id : number){
    return this.httpClient.get<Extension>(`/api/extensions/${id}`)
  }
  getPendings(){
    return this.httpClient.get<Extension[]>('/api/auth/extensions/unpublished')
  }
  getByTag(tag : string){
    return this.httpClient.get<any>(`/api/tag/${tag}`)
  }
  editExtension(id : number, formData){
    return this.httpClient.post<Extension>(`/api/auth/extensions/edit/${id}`, formData)
  }
  createExtension(formData){
    return this.httpClient.post<Extension>('/api/auth/extensions/create', formData)
  }
  checkName(name : string){
    const params = new HttpParams().set('name', name)
    return this.httpClient.get('/api/extensions/checkName', {params})
  }
  checkGithub(gitHub : string){
    const params = new HttpParams().set('link', gitHub)
    return this.httpClient.get('/api/github/getRepoDetails', {params})
  }
  getExtensions(name : string, criteria : string, page : string, perPage : string){
    const params = new  HttpParams().set('name', name).set('orderBy', criteria).set('page', page).set('perPage', perPage)
    return this.httpClient.get<any>('/api/extensions/filter', {params})                                          
  }
  setFeatureState(id : number, state : string){
    return this.httpClient.patch<Extension>(`/api/auth/extensions/${id}/featured/${state}`, null)
  }
  setPublishState(id : number, state : string){
    return this.httpClient.patch<Extension>(`/api/auth/extensions/${id}/status/${state}`, null)
  }
  deleteExtension(id : number){
    return this.httpClient.delete(`/api/auth/extensions/${id}`)
  }
  refreshGitHub(id : number){
    return this.httpClient.patch<Extension>(`/api/auth/extensions/${id}/github`,null)
  }
  rateExtension(id : number, rating : string){
    return this.httpClient.patch(`/api/auth/rate/${id}/${rating}`, {})
  }
}
