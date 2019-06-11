import { Directive,OnInit, Output, HostListener, EventEmitter,  ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Directive({ selector: '[mouseWheel]' })
export class MouseWheelDirective implements OnInit {
  profileAnimation = {
    display : false,
    animate : undefined,
    isFinished : undefined,
  }
  submitComponent = {
    currentSection : 'coverSection',
    animated : true,
    isFinished : undefined,

  }
  profileComponent = {
    profileHeight : 0,
    circleTransform: 0
  }
  extensionComponent = {
    currentSection : 'coverSection',
    isCoverPresent : true,
    animated : true,
    isFinished : undefined
  }
  currentComponent : string

  @ViewChild('tagsContainer') tagsContainer : ElementRef
  constructor(private authService : AuthService, private route: ActivatedRoute){
  }

  @HostListener('wheel', ['$event']) 
  Wheel(e) {
    switch(this.currentComponent){
      case 'HomeComponent' :
        this.homeAnimation(e)
        break
      case 'CreateComponent' :
      case 'EditComponent' :
        this.submitAnimation(e)
        break
      case 'ExtensionComponent' :
        this.extensionAnimation(e)
        break
    }
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.profileComponent.circleTransform = -(window.scrollY / this.profileComponent.profileHeight * 100)

  }
  homeAnimation(e){
    if(this.authService.isLoggedIn){
      if(!this.profileAnimation.animate){

        if (e.deltaY > 0) {
          this.profileAnimation.animate = true

          this.profileAnimation.isFinished = setTimeout(() => {
              this.profileAnimation.display = true
          }, 4100);
        }
      }else{
        if (e.deltaY < 0 && window.scrollY == 0) {
          clearTimeout(this.profileAnimation.isFinished)
          this.profileAnimation.animate = false
          this.profileAnimation.display = false
        }
      }
    }
  }
  submitAnimation(e){
    if(this.submitComponent.currentSection == 'coverSection'){
      if (e.deltaY > 0) {
        this.submitComponent.currentSection = 'extensionSection'
        this.submitComponent.animated = false
        clearTimeout(this.submitComponent.isFinished)
        this.submitComponent.isFinished = setTimeout(() => {
          this.submitComponent.animated = true
        }, 3000);
      }
    }else if(this.submitComponent.currentSection == 'extensionSection'){
      if(e.deltaY < 0 && this.submitComponent.animated){
        this.submitComponent.currentSection = 'coverSection'
        this.submitComponent.animated = false
        clearTimeout(this.submitComponent.isFinished)
        this.submitComponent.isFinished = setTimeout(() => {
          this.submitComponent.animated = true
        }, 3000);
      }else if(this.submitComponent.animated){
        this.submitComponent.currentSection = 'previewSection'
        this.submitComponent.animated = false
        clearTimeout(this.submitComponent.isFinished)
        this.submitComponent.isFinished = setTimeout(() => {
          this.submitComponent.animated = true
        }, 3000);

      }
    }else{
      if(e.deltaY < 0 && this.submitComponent.animated){
        this.submitComponent.currentSection = 'extensionSection'
        this.submitComponent.animated = false
        clearTimeout(this.submitComponent.isFinished)
        this.submitComponent.isFinished = setTimeout(() => {
          this.submitComponent.animated = true
        }, 3000);
      }
    }
  }
  extensionAnimation(e){
    const currentSection = this.extensionComponent.currentSection
    if(this.extensionComponent.isCoverPresent){
      if(currentSection == 'coverSection'){
        if(e.deltaY > 0){
          this.extensionComponent.currentSection = 'extensionSection'
          this.extensionComponent.animated = false
          this.extensionComponent.isFinished = setTimeout(() => {
            this.extensionComponent.animated = true
          }, 4100)
        }
      }else if(currentSection == 'extensionSection'){
        if(e.deltaY < 0){
          clearTimeout(this.submitComponent.isFinished)
          this.extensionComponent.currentSection = 'coverSection'
        }
      }
    }
    if(currentSection == 'extensionSection'){
      if(e.deltaY > 0 && this.extensionComponent.animated){
        this.extensionComponent.currentSection = 'infoSection'
      }
    }else if(currentSection == 'infoSection'){
      if(e.deltaY < 0){
        this.extensionComponent.currentSection = 'extensionSection'
      }
    }
  }
  ngOnInit() {
    this.currentComponent = this.route.component['name']
  }

}