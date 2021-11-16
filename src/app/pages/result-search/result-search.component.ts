import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';
import { DirectoryResult } from 'src/app/models/directory-result';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss']
})
export class ResultSearchComponent implements OnInit {

  results:Array<DirectoryResult> = new Array<DirectoryResult>();

  constructor(private route: ActivatedRoute,private ds: DirectoryService) { }

  ngOnInit(): void {
    let search = this.route.snapshot.paramMap.get("search");
    this.ds.search({search:search}).toPromise().then(r=>{
      this.results = r;
    });
  }


}
