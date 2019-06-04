import { Directive, Output, HostListener, EventEmitter,  ElementRef, ViewChild } from '@angular/core';

@Directive({ selector: '[mouseWheel]' })
export class MouseWheelDirective {
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();
  profileComonent = {
    profileSection : undefined,
    extensionsSection : undefined,
    currentSection : 'profileSection'
  }

  @ViewChild('tagsContainer') tagsContainer : ElementRef
  constructor(){
  }

  @HostListener('wheel', ['$event']) 
  Wheel(e) {
    if(!this.profileComonent.profileSection){
      this.profileComonent.profileSection = document.getElementById('profile-section')
      this.profileComonent.extensionsSection = document.getElementById('extensions-section')
    }

    const profileSection = this.profileComonent.profileSection
    const extensionsSection = this.profileComonent.extensionsSection
    
    if(this.profileComonent.currentSection == 'profileSection'){
      if (e.deltaY > 0) {
        profileSection.classList.remove('fade-out')
        profileSection.classList.add('translate-profile-section')
        extensionsSection.style.display = 'block'    
        this.profileComonent.currentSection = 'extensionsSection'    
      }
    }else{
      if (e.deltaY < 0 && window.scrollY == 0) {
        profileSection.classList.remove('translate-profile-section')
        profileSection.classList.add('fade-out')
        extensionsSection.style.display = 'none'
        this.profileComonent.currentSection = 'profileSection'
      }
    }
  
  }

  mouseWheelFunc(event: any) {
  }
  mouseWheelUpFunc(event){
  }

}