import { Component, OnInit, ViewChildren, QueryList, HostListener, ViewChild } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';
import { ActivatedRoute } from '@angular/router';
import { MouseWheelDirective } from '../helpers/mouse-wheel.directive';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['../pendings/pendings.component.css']
})
export class TagsComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.fixOverflow(this.extensionDescriptions)
  }
  extensions : any[]
  tag : string
  
  @ViewChildren('extensionDescriptions') extensionDescriptions: QueryList<any>
  @ViewChild(MouseWheelDirective) wheelDirective: MouseWheelDirective

  config = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: null
  }

  constructor(private extensionService: ExtensionsService, private route: ActivatedRoute) { 
    this.extensions = undefined
  }

  ngOnInit() {
    this.tag = this.route.snapshot.paramMap.get('tag')
    this.findByTag(this.tag)
  }

  findByTag(tag: string){
    this.extensionService.getByTag(tag).subscribe(tagDto =>{
      this.extensions = tagDto['extensions']
      this.config.totalItems = tagDto['totalExtensions']
    })
  }
  ngAfterViewInit() {
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
  changePage(page){
    this.config.currentPage = page
    this.wheelDirective.calculateScrollAmount()
  }
}
