import { Component, OnInit, ViewChildren, QueryList, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';
import { MouseWheelDirective } from '../helpers/mouse-wheel.directive';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.css']
})
export class PendingsComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.fixOverflow(this.extensionDescriptions)
  }
  @ViewChildren('extensionDescriptions') extensionDescriptions: QueryList<any>
  @ViewChild(MouseWheelDirective) wheelDirective: MouseWheelDirective

  extensions: any[]
  routeSubscription: Subscription
  baseUrl: string

  config = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: null
  }

  constructor(private extensionsService: ExtensionsService, private cdRef: ChangeDetectorRef, private router: Router) { 
    this.extensions = undefined
    this.baseUrl = environment.baseUrl
  }

  ngOnInit() {
    this.findPendings()
  }

  ngOnDestroy() {
    if (this.routeSubscription) {  
      this.routeSubscription.unsubscribe();
   }
  }

  ngAfterViewInit() {
    this.wheelDirective.checkIfMobileScreen()

    this.extensionDescriptions.changes.subscribe(descriptions => {
      this.fixOverflow(descriptions.toArray())
    })
    this.cdRef.detectChanges()

    this.routeSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.findPendings()
      }
    })
  }

  findPendings(){
    this.extensionsService.getPendings().subscribe(data => {
      this.extensions = data
      this.config.totalItems = this.extensions.length
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
