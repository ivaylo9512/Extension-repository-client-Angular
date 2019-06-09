import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { ExtensionsService } from '../services/extensions.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
  ],
})
export class HomeComponent implements OnInit {

  extensions : any
  currentIndex : number
  initial : boolean

  @ViewChild('backgroundsContainer') backgroundsContainer : ElementRef
  @ViewChildren('extensionDescriptions') extensionDescriptions : QueryList<any>

  constructor(private authService : AuthService, private extensionsService : ExtensionsService, private cdRef : ChangeDetectorRef ) {
    this.currentIndex = 0
    this.initial = true
  }

  ngOnInit() {
    this.extensionsService.getFeatured().subscribe(data => {
      this.extensions = data;
      this.setSlideShow()
    })
  }

  setSlideShow(){
    const backgrounds = this.backgroundsContainer.nativeElement.children

    let currentBackground = backgrounds[this.currentIndex];
    let nextBackground = backgrounds[this.currentIndex + 1];

    let selected = false;
    setInterval(() => {
        if(!selected){
            currentBackground = backgrounds[this.currentIndex]
            currentBackground.classList.add('backward')
            currentBackground.classList.remove("current")

            this.currentIndex++
            if(this.currentIndex > backgrounds.length - 1){
              this.currentIndex = 0
            }

            nextBackground = backgrounds[this.currentIndex]
            nextBackground.classList.add('current')

            setTimeout(() => {
                currentBackground.classList.remove('backward');
                currentBackground = nextBackground
            }, 2000);
        }
        selected = false;
    }, 5000);
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
      console.log('hey')
      this.initial = false
      this.cdRef.detectChanges();
    })
  }
}
