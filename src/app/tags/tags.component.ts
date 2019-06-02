import { Component, OnInit } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['../pendings/pendings.component.css']
})
export class TagsComponent implements OnInit {

  extensions : any[]
  tag : string
  
  config = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: null
  }

  constructor(private extensionService : ExtensionsService, private route : ActivatedRoute) { 
    this.extensions = []
  }

  ngOnInit() {
    this.tag = this.route.snapshot.paramMap.get('tag')
    this.findByTag(this.tag)
  }

  findByTag(tag : string){
    this.extensionService.getByTag(tag).subscribe(tagDto =>{
      this.extensions = tagDto['extensions']
      this.config.totalItems = tagDto['totalExtensions']
    })
  }
}
