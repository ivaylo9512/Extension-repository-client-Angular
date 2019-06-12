import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

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
  search: FormControl = new FormControl()

  constructor(private userService : UserService) {
    this.users = undefined
    this.foundUsers = undefined
    this.github = undefined
  }

  ngOnInit() {
    this.getUsers('all')
    this.getGithubSettings()

    this.search.valueChanges.pipe(debounceTime(200)).subscribe(result => this.findUsers(result))
    
  }
  findUsers(result : string){
    this.users = this.foundUsers.filter(user => user.username.startsWith(result))
  }
  getGithubSettings(){
    this.userService.getGithubSettings().subscribe(data => this.github = data)
  }
  changeCriteria(value){
    this.getUsers(value.target.value)
  }
  getUsers(state : string){
    this.userService.getAllByState(state).subscribe(data =>{
      this.users = data
      this.foundUsers = data
      this.config.totalItems = data.length
    })
  }
  setState(user, e){
    e.stopPropagation()
    const state = user.isActive ? 'block' : 'enable'
    this.userService.setState(user.id, state).subscribe(data =>{
      user.isActive = data.isActive
    })
  }
}
