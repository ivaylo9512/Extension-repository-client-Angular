import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
