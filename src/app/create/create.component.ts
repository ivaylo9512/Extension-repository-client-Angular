import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormControl, FormBuilder, NgForm } from '@angular/forms'
import { debounceTime } from 'rxjs/operators';
import { ExtensionsService } from '../services/extensions.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  nameAvailable : string
  nameInput : FormControl = new FormControl()
  state: String 
  gitHubAvailable : string
  gitHubInput : FormControl = new FormControl()
  gitHub : any

  formData : FormData
  logoURL : any
  coverURL : any

  constructor(private extensionService : ExtensionsService, private form: FormBuilder, private sanitizer: DomSanitizer) {
    this.formData = new FormData()
    this.state = 'inactive'
  }

  ngOnInit() {
    this.nameInput.valueChanges.pipe(debounceTime(200)).subscribe(result => {
      this.checkName(result)
    })
    this.gitHubInput.valueChanges.pipe(debounceTime(200)).subscribe(result => {
      this.checkGithub(result)
    })
  }

  checkName(name){
    this.nameAvailable = 'loading'
    this.extensionService.checkName(name).subscribe(available => {
      this.nameAvailable = available.toString()
    })
  }
  checkGithub(gitHub){
    const pattern = /^https:\/\/github\.com\/.+\/.+$/
    if(pattern.test(gitHub)){
      this.gitHubAvailable = 'loading'
      this.extensionService.checkGithub(gitHub).subscribe(gitHub => {
        console.log(gitHub)
        this.gitHub = gitHub
        this.gitHubAvailable = 'true'
      },
    error => {
        this.gitHubAvailable = 'false'
    })
    }
  }

  createExtension(extensionForm : NgForm){
    if(this.nameAvailable == 'true' && this.gitHubAvailable == 'true'){
      const name = this.nameInput.value
      const github = this.gitHubInput.value
      const version = extensionForm.controls['version'].value
      const tags = extensionForm.controls['tags'].value
      const description = extensionForm.controls['description'].value
      
      const extension = {
        name,
        version,
        description,
        github,
        tags
      }
      this.formData.append('extension', JSON.stringify(extension))
      this.extensionService.createExtension(this.formData).subscribe(
        data =>{

        },
        error => {
          console.log(error)
        })
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
    this.formData.append('file', file)
  }

  getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
