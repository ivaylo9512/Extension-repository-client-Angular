import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { ActivatedRoute, Params } from '@angular/router';


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
    totalItems: null
  }

  constructor(private userService : UserService, private route: ActivatedRoute) {
    this.user = []
  }

  ngOnInit() {
    if(+this.route.snapshot.paramMap.get('id')){
      this.getUser(+this.route.snapshot.paramMap.get('id'));
    }else{
      this.loggedUser = JSON.parse(localStorage.getItem('user'))
      if(this.loggedUser){
        this.getUser(this.loggedUser['id'])
      }
    }
  }

  getUser(id : number){
    this.userService.getUser(id).subscribe(data => {
      this.user = data
      this.config.totalItems = data['totalExtensions']
    })
  }
}
