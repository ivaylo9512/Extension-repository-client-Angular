import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { MouseWheelDirective } from '../helpers/mouse-wheel.directive';
import { Subscription } from 'rxjs';
import { HeaderService } from '../helpers/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('header') header: ElementRef
  @ViewChild('mouseWheel') mouseWheel: MouseWheelDirective

  isScrolled: boolean

  constructor(private authService: AuthService, private router: Router, private headerService: HeaderService) { 
  }

  ngOnInit() {
    this.headerService.scrollY.subscribe(scrollY => this.setNavPosition(scrollY))
  }
  
   
  setNavPosition(scrollY: number) {
    const favExtensionsHeight = window.innerHeight / 12.5
    this.isScrolled = window.scrollY > favExtensionsHeight  
  }
  
  ngAfterViewInit(){
  }

}
