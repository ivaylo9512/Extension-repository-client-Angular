import { Component, OnInit, ViewChildren, ElementRef, QueryList, ViewChild} from '@angular/core';
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
  homeComponent : boolean
  @ViewChildren('extensionDescriptions') extensionDescriptions : QueryList<any>
  @ViewChild('extensionsContainer') profileSection : ElementRef

  config = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: null
  }

  constructor(private userService : UserService, private route: ActivatedRoute) {
    this.user = []
  }

  ngOnInit() {
    this.homeComponent = this.route.component['name'] == 'HomeComponent'
    if(!this.homeComponent){
      this.getUser(+this.route.snapshot.paramMap.get('id'));
    }else{
      this.loggedUser = JSON.parse(localStorage.getItem('user'))
      if(this.loggedUser){
        this.getUser(this.loggedUser['id'])
      }
    }
  }

  ngAfterViewInit() {
    this.extensionDescriptions.changes.subscribe(descriptions => {
      descriptions.toArray().forEach(description => {
      
        let height = description.nativeElement.offsetHeight
        let scrollHeight = description.nativeElement.scrollHeight
        let text = description.nativeElement.innerHTML + '...'
      
        while(height < scrollHeight){
          let words = text.split(' ')
          words.pop()
          words.pop()
          text = words.join(' ') + '...'
          
          description.nativeElement.innerHTML = text
          height = description.nativeElement.offsetHeight
          scrollHeight = description.nativeElement.scrollHeight
        }
      })
    })
  }
  getUser(id : number){
    this.userService.getUser(id).subscribe(data => {
      this.user = data
      this.config.totalItems = data['totalExtensions']
    })
  }
}
