import { Component, OnInit, ViewChildren, QueryList, HostListener } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';

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
  extensions : any[]
  @ViewChildren('extensionDescriptions') extensionDescriptions : QueryList<any>

  config = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: null
  }

  constructor(private extensionsService : ExtensionsService) { 
    this.extensions = undefined
  }

  ngOnInit() {
    this.findPendings()
  }

  findPendings(){
    this.extensionsService.getPendings().subscribe(data => {
      this.extensions = data
      this.config.totalItems = this.extensions.length
    })
  }

  ngAfterViewInit() {
    this.extensionDescriptions.changes.subscribe(descriptions => {
      this.fixOverflow(descriptions.toArray())
    })
  }

  fixOverflow(descriptions){
    descriptions.forEach(description => {
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
