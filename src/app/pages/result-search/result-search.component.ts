import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss']
})
export class ResultSearchComponent implements OnInit {

  directories:Array<Directory> = new Array<Directory>();

  constructor(private route: ActivatedRoute,private ds: DirectoryService) { }

  ngOnInit(): void {
    let search = this.route.snapshot.paramMap.get("search");
    this.ds.search({search:search}).toPromise().then(r=>{
      this.directories = r;
    });
  }

  getImg(m:Member){
    if(m.images!.length > 0)
      return m.images![0].base64;
    else return '';
  }

}
