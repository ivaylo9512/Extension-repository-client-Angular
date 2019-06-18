import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms'
import { debounceTime } from 'rxjs/operators';
import { ExtensionsService } from '../services/extensions.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MouseWheelDirective } from '../helpers/mouse-wheel.directive';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('tagsInputElmnt') tagsInputElmnt : ElementRef
  @ViewChild('tagsContainer') tagsContainer : ElementRef
  @ViewChild(MouseWheelDirective) wheelDirective
  @ViewChild('extensionSection') extensionSection : ElementRef

  nameInput : FormControl = new FormControl()
  gitHubInput : FormControl = new FormControl()
  versionInput : FormControl = new FormControl()
  descriptionInput : FormControl = new FormControl()
  tagsInput : FormControl = new FormControl()
  
  formData : FormData
  logoURL : any
  coverURL : any
  gitHub : any

  file : boolean
  gitHubAvailable : string
  nameAvailable : string
  name : string
  version : string
  description : string
  gitHubError : string
  nameError : string

  tags : string[]

  constructor(private extensionService : ExtensionsService, private router : Router, private sanitizer: DomSanitizer) {
    this.formData = new FormData()
    this.tags = []
    this.name = ''
    this.version = ''
    this.description = ''
  }

  ngOnInit() {
    this.nameInput.valueChanges.pipe(debounceTime(200)).subscribe(name => {
      this.nameAvailable = 'loading'
      this.nameError = null
      this.name = name
      this.checkName(name)
    })
    this.gitHubInput.valueChanges.pipe(debounceTime(200)).subscribe(gitHub => {
      this.gitHubAvailable = 'loading'
      this.gitHub = null
      this.gitHubError = null
      
      this.checkGithub(gitHub)
    })
    this.versionInput.valueChanges.pipe(debounceTime(200)).subscribe(version => {
      this.version = version
    })
    this.descriptionInput.valueChanges.pipe(debounceTime(1000)).subscribe(description => {
      this.description = description
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

  ngAfterViewInit() {
    this.wheelDirective.submitComponent.extensionSection = this.extensionSection
    this.wheelDirective.checkIfMobileScreen()
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
          this.name = name
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

  createExtension(extensionForm : NgForm){
    if(this.nameAvailable == 'true' && this.gitHubAvailable == 'true'){
      const name = this.nameInput.value
      const github = this.gitHubInput.value
      const version = this.version
      const description = this.description
      const tags = this.tags.toString()      
      const extension = {
        name,
        version,
        description,
        github,
        tags
      }
      this.formData.set('extension', JSON.stringify(extension))
      this.extensionService.createExtension(this.formData).subscribe(
        data =>{
          this.extensionService.currentExtension = data
          this.router.navigate(['extension', data.id])
        })
    }
  }
  addLogo(e){
    const logo = e.target.files[0]
    this.formData.set('image', logo)
    this.logoURL = window.URL.createObjectURL(logo)

    let reader = new FileReader();
    reader.readAsDataURL(logo); 
    reader.onload = (_event) => { 
      this.logoURL = reader.result; 
    }
  }

  addCover(e){
    const cover = e.target.files[0]
    this.formData.set('cover', cover)
    let reader = new FileReader();
    reader.readAsDataURL(cover); 
    reader.onload = (_event) => { 
      this.coverURL = reader.result; 
    }
  }

  addFile(e){
    const file = e.target.files[0]
    this.file = true
    this.formData.set('file', file)
  }
  getSanitizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  focusInput(e){
    this.tagsInputElmnt.nativeElement.focus()
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
  removeTag(tag){
    const index = this.tags.indexOf(tag)
    this.tags.splice(index, 1)
  }
}
