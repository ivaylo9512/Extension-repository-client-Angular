import { Directive, Output, HostListener, EventEmitter,  ElementRef, ViewChild } from '@angular/core';

@Directive({ selector: '[mouseWheel]' })
export class MouseWheelDirective {
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();
  profileComonent = {
    profileSection : undefined,
    extensionsSection : undefined,
    circle : undefined,
    currentSection : 'profileSection',
    display : true
  }

  @ViewChild('tagsContainer') tagsContainer : ElementRef
  constructor(){
  }

  @HostListener('wheel', ['$event']) 
  Wheel(e) {
    if(!this.profileComonent.profileSection){
      this.profileComonent.profileSection = document.getElementById('profile-section')
      this.profileComonent.extensionsSection = document.getElementById('extensions-section')
      this.profileComonent.circle = document.getElementById('circle')
    }

    const profileSection = this.profileComonent.profileSection
    const extensionsSection = this.profileComonent.extensionsSection
    const circle = this.profileComonent.circle

    if(this.profileComonent.currentSection == 'profileSection'){
      if (e.deltaY > 0) {
        profileSection.classList.remove('fade-out')
        profileSection.classList.add('fade-in')
        circle.classList.add('animate')
        this.profileComonent.currentSection = 'extensionsSection'
        this.profileComonent.display = true

        setTimeout(() => {
          const animationFinished = window.getComputedStyle(profileSection).getPropertyValue("opacity") == '1'
          console.log(animationFinished)
          if(this.profileComonent.display && animationFinished){
            extensionsSection.style.display = 'block'    
          }
        }, 4100);
      }
    }else{
      if (e.deltaY < 0 && window.scrollY == 0) {
        profileSection.classList.remove('fade-in')
        circle.classList.remove('animate')
        profileSection.classList.add('fade-out')
        extensionsSection.style.display = 'none'
        this.profileComonent.currentSection = 'profileSection'
        this.profileComonent.display = false
      }
    }
  
  }

  mouseWheelFunc(event: any) {
  }
  mouseWheelUpFunc(event){
  }

}