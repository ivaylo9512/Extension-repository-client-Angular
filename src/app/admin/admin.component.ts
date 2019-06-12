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
    itemsPerPage: 13,
    currentPage: 1,
    totalItems: null
  }
  github : any
  users : any[]
  foundUsers : any[]
  constructor(private userService : UserService) {
    this.users = undefined
    this.github = undefined
  }

  ngOnInit() {
    this.getUsers('all')
    this.getGithubSettings()
  }
  getGithubSettings(){
    this.userService.getGithubSettings().subscribe(data => {
      this.github = data
      console.log(data)
    })
  }
  changeCriteria(value){
    this.getUsers(value.target.value)
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
