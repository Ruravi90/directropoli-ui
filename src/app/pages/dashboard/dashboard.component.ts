import { Component, OnInit } from '@angular/core';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  directories:Array<Directory> = new Array<Directory>();

  constructor(private ds: DirectoryService) { }

  ngOnInit(): void {
    this.ds.directories().toPromise().then(r=>{
      this.directories = r;
    });
  }

  getImg(d:Directory){
    return  d.images?.find(i=> i.description == 'header')?.base64;
  }

}
