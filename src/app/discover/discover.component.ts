import { Component, OnInit, ViewChildren, QueryList, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MouseWheelDirective } from '../helpers/mouse-wheel.directive';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

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
  @ViewChildren('extensionDescriptions') extensionDescriptions: QueryList<any>
  @ViewChild('discoverSection') discoverSection: ElementRef
  @ViewChild(MouseWheelDirective) wheelDirective: MouseWheelDirective

  search: FormControl = new FormControl()
  extensions: any[]
  routeSubscription: Subscription

  config = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: null,
    criteria: 'name',
    search: ''
  }

  constructor(private extensionsService: ExtensionsService, private cdRef: ChangeDetectorRef, private router: Router) {
    this.extensions = undefined
   }

  ngOnInit() {
    this.findExtensions(1)
    this.search.valueChanges.pipe(debounceTime(200)).subscribe(result => {
      this.config.search = result
      this.findExtensions(1)
    }) 
  }

  ngOnDestroy() {
    if (this.routeSubscription) {  
      this.routeSubscription.unsubscribe();
   }
  }

  findExtensions(page: number){
    this.extensionsService.getExtensions(this.config.search, this.config.criteria, (page - 1).toString() , this.config.itemsPerPage.toString()).subscribe(data => {
      this.extensions = data['extensions']
      this.config.currentPage = page
      this.config.totalItems = data['totalResults']
      this.wheelDirective.calculateScrollAmount()
    })
  
  }
  changeCriteria(value){
    this.config.criteria = value.target.value
    this.findExtensions(1)
  }

  ngAfterViewInit() {
    this.wheelDirective.checkIfMobileScreen()

    this.extensionDescriptions.changes.subscribe(descriptions => {
      this.fixOverflow(descriptions.toArray())
    })
    this.cdRef.detectChanges()

    this.routeSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.findExtensions(1)
      }
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
