import { Component, OnInit, ViewChildren, ElementRef, QueryList, ViewChild, ChangeDetectorRef, HostListener} from '@angular/core';
import { UserService } from '../services/user.service'
import { ActivatedRoute } from '@angular/router';
import { MouseWheelDirective } from '../helpers/mouse-wheel.directive';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleExtensionsDescription(this.extensionDescriptions)
    this.handleUserInfo(this.userInfo)
  }

  loggedUser : any
  user : any
  admin : boolean
  homeComponent : boolean

  @ViewChildren('extensionDescriptions') extensionDescriptions : QueryList<any>
  @ViewChildren('userInfo') userInfo : QueryList<any>
  @ViewChild('extensionsContainer') extensionsContainer : ElementRef
  @ViewChild('profileSection') profileSection : ElementRef
  
  homeAnimation = {
    diplay : false,
    animate : false

  }
  config = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: null
  }

  constructor(private wheelDirective : MouseWheelDirective, private userService : UserService, private route: ActivatedRoute, private cdRef : ChangeDetectorRef) {
    this.user = 'loading'
  }

  ngOnInit() {
    this.wheelDirective.profileComponent.profileHeight = this.profileSection.nativeElement.offsetHeight
    this.homeComponent = this.route.component['name'] == 'HomeComponent'
    if(!this.homeComponent){
      this.getUser(+this.route.snapshot.paramMap.get('id'));
      
      this.wheelDirective.profileComponent.animate = true
      this.wheelDirective.profileComponent.isHomeView = false
      clearTimeout(this.wheelDirective.profileComponent.isFinished)
    }else{
      this.loggedUser = JSON.parse(localStorage.getItem('user'))
      if(this.loggedUser){
        this.getUser(this.loggedUser['id'])
      }
      
      this.wheelDirective.profileComponent.animate = undefined
      this.wheelDirective.profileComponent.display = false
      this.wheelDirective.profileComponent.isHomeView = true

    }
  }
  fixOverflow(node){  
    let height = node.nativeElement.offsetHeight
    let scrollHeight = node.nativeElement.scrollHeight
    let text = node.nativeElement.innerHTML + '...'
  
    while(height < scrollHeight){
      let words = text.split(' ')
      words.pop()
      words.pop()
      text = words.join(' ') + '...'
      
      node.nativeElement.innerHTML = text
      height = node.nativeElement.offsetHeight
      scrollHeight = node.nativeElement.scrollHeight
    }
  }
  ngAfterViewInit() {
    this.extensionDescriptions.changes.subscribe(descriptions => {
      this.handleExtensionsDescription(descriptions.toArray())

    })
    this.userInfo.changes.subscribe(info => 
      this.handleUserInfo(info.toArray())
    )
    this.wheelDirective.checkIfMobileScreen()
    this.cdRef.detectChanges();
  }
  handleExtensionsDescription(descriptions){
    this.extensionsContainer.nativeElement.style.display = "block"
    descriptions.forEach(description => {
      this.fixOverflow(description)
    })
    if(this.homeComponent && !this.wheelDirective.profileComponent.display){
      this.extensionsContainer.nativeElement.style.display = "none"        
    }
  }
  handleUserInfo(info){
    info.forEach(description => 
      this.fixOverflow(description)
    )
  }
  getUser(id : number){
    this.userService.getUser(id).subscribe(data => {
      this.user = data
      this.config.totalItems = data['totalExtensions']
    })
  }
}
