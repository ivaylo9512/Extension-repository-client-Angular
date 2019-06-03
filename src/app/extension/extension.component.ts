import { Component, OnInit } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.css']
})
export class ExtensionComponent implements OnInit {

  extension : any

  constructor(private extensionService : ExtensionsService, private authService : AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.extension = []
    this.getExtension(+this.route.snapshot.paramMap.get('id'))
  }

  getExtension(id : number){
    this.extensionService.getExtension(id).subscribe(data =>{
      this.extension = data    
    })
  }
  setFeatureState(){
    let state
    if(this.extension.featured){
      state = 'unfeature'
    }else{
      state = 'feature'
    }
    this.extensionService.setFeatureState(this.extension.id, state).subscribe(data =>{
      this.extension.featured = data['featured']
    })

  }

}
