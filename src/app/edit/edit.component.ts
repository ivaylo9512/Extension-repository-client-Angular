import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExtensionsService } from '../services/extensions.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  extension : any

  constructor(private extensionService : ExtensionsService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.getExtension(+this.route.snapshot.paramMap.get('id'))
  }

  getExtension(id : number){
    this.extensionService.getExtension(id).subscribe(extension =>{
      this.extension = extension    
    })
  }
}
