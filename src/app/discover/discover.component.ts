import { Component, OnInit } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { removeSummaryDuplicates } from '@angular/compiler';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  queryField: FormControl = new FormControl()
  extensions : any

  config = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: 0,
    criteria: 'name',
    search: ''
  };

  constructor(private extensionsService : ExtensionsService) {
    this.extensions = []
   }

  ngOnInit() {
    this.findExtensions(1)
    this.queryField.valueChanges.pipe(debounceTime(200)).subscribe(result => {
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
}
