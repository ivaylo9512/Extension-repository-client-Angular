import { Component, OnInit } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.css']
})
export class PendingsComponent implements OnInit {

  extensions : any

  config = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: null,
    criteria: 'name',
    search: ''
  }

  constructor(private extensionsService : ExtensionsService) { 
    this.extensions = []
  }

  ngOnInit() {
  }

  findPendings(page : number){

  }
}
