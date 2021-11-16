import { Component, OnInit } from '@angular/core';
import { PublicService }  from '../../service/public.service';
import { Directory }  from '../../models/directory';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexPublicComponent implements OnInit {

  directories:Array<Directory> = new Array<Directory>();
  isLoading=true;

  constructor(private ps: PublicService) { }

  ngOnInit(): void {
    this.ps.publics().toPromise().then(r=>{
      this.directories = r;
      this.isLoading = false;
    });
  }

  getImg(d:Directory){
    return  d.images?.find(i=> i.description == 'header')?.base64;
  }

}
