import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
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

  file : boolean
  formData : FormData
  extension : any
  logoURL : any
  coverURL : any
  gitHub : any

  gitHubAvailable : string
  nameAvailable : string
  initialName : string
  initialGitHub : string
  gitHubError : string
  nameError : string

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
    this.nameInput.valueChanges.pipe(debounceTime(200)).subscribe(name => {
      this.nameError = null
      this.extension.name = name
      if(name != this.initialName){
        this.nameAvailable = 'loading'
        this.checkName(name)
      }else{
        this.nameAvailable = 'true'
      }
    })
    this.gitHubInput.valueChanges.pipe(debounceTime(200)).subscribe(gitHub => {
      this.gitHubError = null
      this.gitHub = null
      this.extension.gitHubLink = gitHub
      if(gitHub != this.initialGitHub){
        this.gitHubAvailable = 'loading'
        
        this.checkGithub(gitHub)
      }else{
        this.gitHubAvailable = 'true'
      }
    })
    this.versionInput.valueChanges.pipe(debounceTime(200)).subscribe(version => {
      this.extension.version = version
    })
    this.descriptionInput.valueChanges.pipe(debounceTime(1000)).subscribe(description => {
      this.extension.description = description
    })
    this.tagsInput.valueChanges.subscribe(tag =>{
      if (/\s/.test(tag)) {
        if(tag.length > 1){
          this.addTag(tag)
        }else{
          this.tagsInputElmnt.nativeElement.value = ''
        }
      }
    })
  }

  checkName(name){
    this.nameAvailable = 'loading'
    if(name.length == 0){
      this.nameAvailable = null    
    }else if(name.length > 7){
      this.extensionService.checkName(name).subscribe(available => {
        this.nameAvailable = available.toString()
        if(this.nameAvailable == 'false'){
          this.nameError = 'Name is unavailable.'
        }else{
          this.extension.name = name
          this.nameAvailable = 'true'
        }
      })
    }else{
      this.nameAvailable = 'false'
      this.nameError = 'Name is less than 7 symbolls'
    }
  }
  checkGithub(gitHub){
    const pattern = /^https:\/\/github\.com\/.+\/.+$/
    if(gitHub.length == 0){
      this.gitHubAvailable = null
    }else if(pattern.test(gitHub)){
      this.extensionService.checkGithub(gitHub).subscribe(
        gitHub => {
          this.gitHub = gitHub
          this.gitHubAvailable = 'true'
        },
        error => {
          this.gitHubAvailable = 'false'
          this.gitHubError = error
        })
    }else{
      this.gitHubAvailable = 'false'
      this.gitHubError = 'Link is not a valid repo URL.'
    }
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
  addCover(e){
    const cover = e.target.files[0]
    this.formData.append('cover', cover)
    let reader = new FileReader();
    reader.readAsDataURL(cover); 
    reader.onload = (_event) => { 
      this.coverURL = reader.result; 
    }
  }
  addFile(e){
    const file = e.target.files[0]
    this.file = true
    this.formData.append('file', file)
  }
  addTag(tag){
    tag = tag.trim()
    this.tagsInputElmnt.nativeElement.value = ''
    if(!this.tags.includes(tag)){
      this.tags.push(tag)
      const scrollHeight = this.tagsContainer.nativeElement.scrollHeight
      const offsetHeight = this.tagsContainer.nativeElement.offsetHeight
      if(scrollHeight > offsetHeight){
        this.tags.pop()
      }
    }
  }
  getExtension(id : number){
    this.extensionService.getExtension(id).subscribe(extension =>{
      this.extension = extension
      this.tags = extension['tags']
      this.coverURL = extension['coverLocation']
      this.logoURL = extension['imageLocation']
      this.initialGitHub = extension['gitHubLink']
      this.initialName = extension['name']
    })
  }
  focusInput(e){
    this.tagsInputElmnt.nativeElement.focus()
  }
  getSanitizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
