import { Component, OnInit } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.css']
})
export class ExtensionComponent implements OnInit {

  extension : any

  constructor(private extensionService : ExtensionsService,private router : Router, private authService : AuthService, private route: ActivatedRoute) { }

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
    let state : string
    if(this.extension.featured){
      state = 'unfeature'
    }else{
      state = 'feature'
    }
    this.extensionService.setFeatureState(this.extension.id, state).subscribe(data =>{
      this.extension.featured = data['featured']
    })
  }
  deleteExtension(){
    this.extensionService.deleteExtension(this.extension.id).subscribe(data =>{
      this.router.navigate(['/home'])   
    })
  }
  setPublishState(){
    let state : string
    if(this.extension.pending){
      state = 'publish'
    }else{
      state = 'unpublish'
    }
    this.extensionService.setPublishState(this.extension.id,state).subscribe(data =>
      this.extension.pending = data['pending']
    )
  }

  refreshGitHub(){
    this.extensionService.refreshGitHub(this.extension.id).subscribe(data =>{
      this.extension.openIssues = data['openIssues']
      this.extension.pullRequests = data['pullRequests']
      this.extension.lastCommit = data['lastCommit']
      this.extension.lastErrorMessage = data['lastErrorMessage']
      this.extension.lastSuccessfulPullOfData = data['lastSuccessfulPullOfData']
      this.extension.lastFailedAttemptToCollectData = data['lastFailedAttemptToCollectData']
    })
  }
}
