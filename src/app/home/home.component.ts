import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  extensions : any;
  @ViewChild('backgroundsContainer') backgroundsContainer : ElementRef

  constructor(private authService : AuthService, private extensionsService : ExtensionsService ) {
   }

  ngOnInit() {
    this.extensionsService.getFeatured().subscribe(data => {
      this.extensions = data;
      this.setSlideShow()
    })
  }

  setSlideShow(){
    let currentIndex = 0
    const backgrounds = this.backgroundsContainer.nativeElement.children

    let currentBackground = backgrounds[currentIndex];
    let nextBackground = backgrounds[currentIndex + 1];

    let selected = false;
    setInterval(() => {
        if(!selected){
            currentBackground = backgrounds[currentIndex]
            currentBackground.classList.add('backward')
            currentBackground.classList.remove("current")

            currentIndex++
            if(currentIndex > backgrounds.length - 1){
                currentIndex = 0
            }

            nextBackground = backgrounds[currentIndex]
            nextBackground.classList.add('current')

            setTimeout(() => {
                currentBackground.classList.remove('backward');
                currentBackground = nextBackground
            }, 2000);
        }
        selected = false;
    }, 5000);
  }
}
