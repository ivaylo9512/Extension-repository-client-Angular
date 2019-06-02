import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExtensionsService } from '../services/extensions.service';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('tagsInputElmnt') tagsInputElmnt : ElementRef
  @ViewChild('tagsContainer') tagsContainer : ElementRef

  nameInput : FormControl = new FormControl()
  gitHubInput : FormControl = new FormControl()
  versionInput : FormControl = new FormControl()
  descriptionInput : FormControl = new FormControl()
  tagsInput : FormControl = new FormControl()

  formData : FormData
  extension : any
  logoURL : any
  coverURL : any

  gitHubAvailable : string
  nameAvailable : string

  tags : string[]

  constructor(private extensionService : ExtensionsService, private route : ActivatedRoute, private sanitizer: DomSanitizer) {
    this.formData = new FormData()
    this.extension = {}
    this.tags = []
    this.gitHubAvailable = 'true'
    this.nameAvailable = 'true'
    this.logoURL = null
    this.coverURL = null

  }

  ngOnInit() {
    this.getExtension(+this.route.snapshot.paramMap.get('id'))
    this.tags = [] 
  }

  addLogo(e){
    const logo = e.target.files[0]
    this.formData.append('image', logo)
    this.logoURL = window.URL.createObjectURL(logo)

    let reader = new FileReader();
    reader.readAsDataURL(logo); 
    reader.onload = (_event) => { 
      this.logoURL = reader.result; 
    }

  }

  getExtension(id : number){
    this.extensionService.getExtension(id).subscribe(extension =>{
      this.extension = extension
      this.tags = extension['tags']
      this.coverURL = extension['coverLocation']
      this.logoURL = extension['imageLocation']

    })
  }

  getSanitizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
