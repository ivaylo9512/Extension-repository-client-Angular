import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { debounceTime } from 'rxjs/operators';
import { ExtensionsService } from '../services/extensions.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  avaiable : string
  name : FormControl = new FormControl();

  constructor(private extensionService : ExtensionsService) { }

  ngOnInit() {
    this.name.valueChanges.pipe(debounceTime(200)).subscribe(result => {
      this.avaiable = 'loading'
      this.extensionService.checkName(result).subscribe(avaiable => {
        this.avaiable = avaiable.toString()
      })
    })
  }

  checkName(){
    
  }
}
