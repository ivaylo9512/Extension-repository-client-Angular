import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  config = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: null
  }
  users : any[]
  constructor(private userService : UserService) {
    this.users = undefined
  }

  ngOnInit() {
    this.getUsers('all')
  }

  getUsers(state : string){
    this.userService.getAllByState(state).subscribe(data =>{
      this.users = data
      this.config.totalItems = data.length
    })
  }
  setState(userId : number, state : string){
    this.userService.setState(userId, state).subscribe(data =>{

    })
  }
}
