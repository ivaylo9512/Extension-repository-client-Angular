import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms'
import { debounceTime } from 'rxjs/operators';
import { ExtensionsService } from '../services/extensions.service';

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


  constructor(private extensionService : ExtensionsService, private form: FormBuilder) { }

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
}
