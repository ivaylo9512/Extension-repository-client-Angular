import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users : any[]
  constructor(private userService : UserService) {

  }

  ngOnInit() {
    this.getUsers('all')
  }

  getUsers(state : string){
    this.userService.getAllByState(state).subscribe(data =>{
      this.users = data
    })
  }
  setState(userId : number, state : string){
    this.userService.setState(userId, state).subscribe(data =>{

    })
  }
}
