import { Component, OnInit } from '@angular/core';
import { ExtensionsService } from '../services/extensions.service';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.css']
})
export class ExtensionComponent implements OnInit {

  extension : any

  constructor(private extensionService : ExtensionsService) { }

  ngOnInit() {}

  getExtension(id : number){
    this.extensionService.getExtension(id).subscribe(data =>{
      this.extension = data    
    })
  }

}
