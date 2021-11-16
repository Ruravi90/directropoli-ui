import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { DirectoryService }  from '../../service/directory.service';
import { PublicService }  from '../../service/public.service';
import { DirectoryResult } from 'src/app/models/directory-result';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss']
})
export class ResultSearchComponent implements OnInit {

  results:Array<DirectoryResult> = new Array<DirectoryResult>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ps: PublicService,
    private ds: DirectoryService) { }

  ngOnInit(): void {

    let isPublic = this.router.url.includes("public");
    let search = this.route.snapshot.paramMap.get("search");

    if(isPublic){
      this.ps.search({search:search}).toPromise().then(r=>{
        this.results = r;
      });
    }
    else{
      this.ds.search({search:search}).toPromise().then(r=>{
        this.results = r;
      });
    }
  }


}
