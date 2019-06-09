import { Directive,OnInit, Output, HostListener, EventEmitter,  ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Directive({ selector: '[mouseWheel]' })
export class MouseWheelDirective implements OnInit {
  profileComponent = {
    profileSection : undefined,
    extensionsSection : undefined,
    circle : undefined,
    currentSection : 'profileSection',
    display : true
  }
  profileAnimation = {
    display : false,
    animate : false
  }
  submitComponent = {
    coverSection : undefined,
    extensionSection : undefined,
    previewSection : undefined,
    circle : undefined,
    currentSection : 'coverSection',
    animated : true
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
        break;
      case 'CreateComponent' :
      case 'EditComponent' :
        this.submitAnimation(e)
        break;
    }
  }

  homeAnimation(e){
    if(this.authService.isLoggedIn){

      const profileSection = this.profileComponent.profileSection
      const extensionsSection = this.profileComponent.extensionsSection
      const circle = this.profileComponent.circle

      if(this.profileComponent.currentSection == 'profileSection'){
        if (e.deltaY > 0) {
          circle.classList.add('animate')
          this.profileComponent.currentSection = 'extensionsSection'
          this.profileAnimation.animate = true
          setTimeout(() => {
            const animationFinished = window.getComputedStyle(profileSection).getPropertyValue("opacity") == '1'
            if(animationFinished){
              this.profileAnimation.display = true

            }
          }, 4100);
        }
      }else{
        if (e.deltaY < 0 && window.scrollY == 0) {
          this.profileAnimation.animate = false
          circle.classList.remove('animate')
          this.profileComponent.currentSection = 'profileSection'
          this.profileAnimation.display = false
        }
      }
    }
  }
  submitAnimation(e){
    const coverSection = this.submitComponent.coverSection
    const extensionsSection = this.submitComponent.extensionSection
    const previewSection = this.submitComponent.previewSection
    const circle = this.submitComponent.circle
    e.preventDefault()

    if(this.submitComponent.currentSection == 'coverSection'){
      if (e.deltaY > 0) {
        extensionsSection.classList.add('fade-in')
        circle.classList.add('animate')
        this.submitComponent.currentSection = 'extensionSection'
        this.submitComponent.animated = false

        setTimeout(() => {
          this.submitComponent.animated = true
        }, 3000);
      }
    }else if(this.submitComponent.currentSection == 'extensionSection'){
      if(e.deltaY < 0 && this.submitComponent.animated){
        extensionsSection.classList.remove('fade-in')
        circle.classList.remove('animate')
        this.submitComponent.currentSection = 'coverSection'
      }else if(this.submitComponent.animated){
        previewSection.classList.add('fade-in')
        this.submitComponent.currentSection = 'previewSection'
        this.submitComponent.animated = false
        setTimeout(() => {
          this.submitComponent.animated = true
        }, 3000);
      }
    }else{
      if(e.deltaY < 0 && this.submitComponent.animated){
        previewSection.classList.remove('fade-in')
        this.submitComponent.currentSection = 'extensionSection'

        this.submitComponent.animated = false
        setTimeout(() => {
          this.submitComponent.animated = true
        }, 3000);
      }
    }
  }
  ngOnInit() {
    this.currentComponent = this.route.component['name']
  }
  ngAfterViewChecked(){
    switch(this.currentComponent){
      case 'HomeComponent' :
        this.profileComponent.profileSection = document.getElementById('profile-section')
        this.profileComponent.extensionsSection = document.getElementById('extensions-section')
        this.profileComponent.circle = document.getElementById('circle')
        break;
      case 'CreateComponent' :
      case 'EditComponent' :
        this.submitComponent.coverSection = document.getElementById('cover-section')
        this.submitComponent.extensionSection = document.getElementById('extension-section')
        this.submitComponent.previewSection = document.getElementById('preview-section')
        this.submitComponent.circle = document.getElementById('circle')
        break;    
    }
  }

}