import { Component, OnInit } from '@angular/core';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';

@Component({
  selector: 'app-private-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexPrivateComponent implements OnInit {

  directories:Array<Directory> = new Array<Directory>();
  isLoading=true;

  constructor(private ds: DirectoryService) { }

  ngOnInit(): void {
    this.ds.directories().toPromise().then(r=>{
      this.directories = r;
      this.isLoading = false;
    });
  }

  getImg(d:Directory){
    return  d.images?.find(i=> i.description == 'header')?.base64;
  }

}
