import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-fav-extensions',
  templateUrl: './fav-extensions.component.html',
  styleUrls: ['./fav-extensions.component.css']
})
export class FavExtensionsComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.fixOverflow(this.extensionDescriptions)
  }

  @ViewChild('backgroundsContainer') backgroundsContainer : ElementRef
  @ViewChildren('extensionDescriptions') extensionDescriptions : QueryList<any>

  extensions : any[]
  currentIndex : number
  initial : boolean

  constructor(private authService : AuthService, private extensionsService : ExtensionsService, private cdRef : ChangeDetectorRef) { 
    this.currentIndex = 0
    this.initial = true
    this.extensions = undefined
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
      this.fixOverflow(descriptions.toArray())
      this.cdRef.detectChanges();
    })
  }
  fixOverflow(descriptions){
    this.initial = true
    descriptions.forEach((description, i) => {
      description.nativeElement.innerHTML = this.extensions[i].description  
       
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
    this.initial = false
  }
}
