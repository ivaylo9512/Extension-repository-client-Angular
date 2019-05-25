import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms'
import { debounceTime } from 'rxjs/operators';
import { ExtensionsService } from '../services/extensions.service';
import { NgForm } from '@angular/forms'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  nameAvailable : string
  gitHubAvailable : string
  nameInput : FormControl = new FormControl()

  gitHubInput : FormControl = new FormControl()
  gitHub : any

  formData


  constructor(private extensionService : ExtensionsService, private form: FormBuilder) {
    this.formData = new FormData()
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
        this.gitHub = gitHub
        this.gitHubAvailable = 'true'
      },
    error => {
        this.gitHubAvailable = 'false'
    })
    }
  }

  createExtension(extensionForm : NgForm){
    console.log(this.nameAvailable)
    console.log(this.gitHubAvailable)
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
      this.extensionService.createExtension(this.formData).subscribe(data =>{

      },
    error => {
      console.log(error)
    })
    }
  }
  addLogo(e){
    const logo = e.target.files[0]
    this.formData.append('image', logo)
  }
  addCover(e){
    const cover = e.target.files[0]
    this.formData.append('cover', cover)
  }
  addFile(e){
    const cover = e.target.files[0]
    this.formData.append('file', cover)
  }
}
