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
  createExtension(extension : Extension){
    this.httpClient.post('/api/extensions/featured', {
      extension
    })
  }
  checkName(name : string){
    const params = new HttpParams().set('name', name)
    return this.httpClient.get('/api/extensions/checkName', {params})
  }
  getExtensions(name : string, criteria : string, page : string, perPage : string){
    const params = new  HttpParams().set('name', name).set('orderBy', criteria).set('page', page).set('perPage', perPage)

    return this.httpClient.get("/api/extensions/filter", {params})                  
                              
  }
}
