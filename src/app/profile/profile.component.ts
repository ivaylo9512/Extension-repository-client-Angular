import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser : any
  user : any
  admin : boolean
  constructor(private userService : UserService) {
    this.user = []
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'))
    this.admin = this.loggedUser['authorities'][0]['authority'] === 'ROLE_ADMIN' ? true : false
    if(this.loggedUser){
      this.getUser(this.loggedUser['id'])
    }
  }

  getUser(id : number){
    this.userService.getUser(id).subscribe(data => {
      this.user = data
    })
  }

}
