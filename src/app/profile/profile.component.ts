import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { ExtensionComponent } from '../extension/extension.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser : any
  user : any
  admin : boolean

  config = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: 0
  };

  constructor(private userService : UserService) {
    this.user = []
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    if(this.loggedUser){
      this.getUser(this.loggedUser['id'])
    }
  }

  getUser(id : number){
    this.userService.getUser(id).subscribe(data => {
      this.user = data
      this.config.totalItems = data['totalExtensions']
    })
  }
  pageChanged(event){
    console.log(event)
    this.config.currentPage = event;
  }
}
