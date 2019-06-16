import { Directive,OnInit, Output, HostListener, EventEmitter,  ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Directive({ selector: '[mouseWheel]' })
export class MouseWheelDirective implements OnInit {
  submitComponent = {
    currentSection : 'coverSection',
    isFinished : undefined,
    extensionSection : undefined,
    previewSection : undefined
  }
  profileComponent = {
    display : false,
    animate : undefined,
    isFinished : undefined,
    profileHeight : 0,
    circleTransform: 0,
    isHomeView : undefined
  }
  extensionComponent = {
    currentSection : 'coverSection',
    isCoverPresent : true,
    extensionSection : undefined,
    slidingContainer : undefined
  }
  currentComponent : string

  @ViewChild('tagsContainer') tagsContainer : ElementRef
  constructor(private authService : AuthService, private route: ActivatedRoute){
  }

  @HostListener('wheel', ['$event']) 
  Wheel(e) {
    switch(this.currentComponent){
      case 'HomeComponent' :
        this.pofileAnimation(e)
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
  pofileAnimation(e){
    if(this.authService.isLoggedIn && this.profileComponent.isHomeView){
      if(!this.profileComponent.animate){

        if (e.deltaY > 0) {
          this.profileComponent.animate = true

          this.profileComponent.isFinished = setTimeout(() => {
              this.profileComponent.display = true
          }, 4100);
        }
      }else{
        if (e.deltaY < 0 && window.scrollY == 0) {
          clearTimeout(this.profileComponent.isFinished)
          this.profileComponent.animate = false
          this.profileComponent.display = false
        }
      }
    }
  }
  submitAnimation(e){
    const extensionOpacity = window.getComputedStyle(this.submitComponent.extensionSection.nativeElement).getPropertyValue('opacity')
    const previewOpacity = window.getComputedStyle(this.submitComponent.previewSection.nativeElement).getPropertyValue('opacity')
    if(this.submitComponent.currentSection == 'coverSection'){
      if (e.deltaY > 0) {
        this.submitComponent.currentSection = 'extensionSection'
      }
    }else if(this.submitComponent.currentSection == 'extensionSection'){
      if(e.deltaY < 0 && extensionOpacity == '1'){
        this.submitComponent.currentSection = 'coverSection'
      }else if(extensionOpacity == '1'){
        this.submitComponent.currentSection = 'previewSection'
      }
    }else{
      if(e.deltaY < 0 && previewOpacity == '1'){
        this.submitComponent.currentSection = 'extensionSection'
      }
    }
  }
  extensionAnimation(e){
    const extensionOpacity = window.getComputedStyle(this.extensionComponent.extensionSection.nativeElement).getPropertyValue('opacity')
    const sliderOpacity = window.getComputedStyle(this.extensionComponent.slidingContainer.nativeElement).getPropertyValue('opacity')

    const currentSection = this.extensionComponent.currentSection
    if(this.extensionComponent.isCoverPresent){
      if(currentSection == 'coverSection'){
        if(e.deltaY > 0){
          this.extensionComponent.currentSection = 'extensionSection'
        }
      }else if(currentSection == 'extensionSection'){
        if(e.deltaY < 0 && sliderOpacity == '0'){
          this.extensionComponent.currentSection = 'coverSection'
        }
      }
    }
    if(currentSection == 'extensionSection'){
      if(e.deltaY > 0 && extensionOpacity == '1'){
        this.extensionComponent.currentSection = 'infoSection'
      }
    }else if(currentSection == 'infoSection'){
      if(e.deltaY < 0 ){
        this.extensionComponent.currentSection = 'extensionSection'
      }
    }
  }
  ngOnInit() {
    this.currentComponent = this.route.component['name']
  }

}