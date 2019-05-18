import { Component, OnInit } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  extensions : any

  config = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: 0
  };

  constructor(private extensionsService : ExtensionsService) {
    this.extensions = []
   }

  ngOnInit() {
    this.findExtensions("", "name", '0', this.config.itemsPerPage)
  }

  findExtensions(name : string, criteria : string, page : string, perPage: string){
    this.extensionsService.getExtensions(name, criteria, page, perPage).subscribe(data => {
      this.extensions = Object.values(data)
    })
  }

}
