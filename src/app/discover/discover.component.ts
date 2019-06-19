import { Component, OnInit, ViewChildren, QueryList, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MouseWheelDirective } from '../helpers/mouse-wheel.directive';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.fixOverflow(this.extensionDescriptions)
  }
  search: FormControl = new FormControl()
  extensions : any[]
  @ViewChildren('extensionDescriptions') extensionDescriptions : QueryList<any>
  @ViewChild('discoverSection') discoverSection : ElementRef
  @ViewChild(MouseWheelDirective) wheelDirective

  config = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: null,
    criteria: 'name',
    search: ''
  }

  constructor(private extensionsService : ExtensionsService) {
    this.extensions = undefined
   }

  ngOnInit() {
    this.findExtensions(1)
    this.search.valueChanges.pipe(debounceTime(200)).subscribe(result => {
      this.config.search = result
      this.findExtensions(1)
    }) 
  }

  findExtensions(page : number){
    this.extensionsService.getExtensions(this.config.search, this.config.criteria, (page - 1).toString() , this.config.itemsPerPage.toString()).subscribe(data => {
      this.extensions = data['extensions']
      this.config.currentPage = page
      this.config.totalItems = data['totalResults']
    })
  }
  changeCriteria(value){
    this.config.criteria = value.target.value
    this.findExtensions(0)
  }
  ngAfterViewInit() {
    this.wheelDirective.checkIfMobileScreen()
    this.extensionDescriptions.changes.subscribe(descriptions => {
      this.fixOverflow(descriptions.toArray())
    })
  }
  fixOverflow(descriptions){
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
  }
}
