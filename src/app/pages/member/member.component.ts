import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  directoryId!:number;
  directory: Directory = Object.assign(new Directory());

  constructor(
    private route: ActivatedRoute,
    private ds: DirectoryService
    ) { }

  ngOnInit(): void {
    this.directoryId = Number(this.route.snapshot.paramMap.get("directoryId"));
    console.log("parameter",this.directoryId);
    this.ds.withMembers(this.directoryId).toPromise().then(r=>{
      this.directory = r[0];
      console.log("Directory",r[0]);
    });
  }

  getImg(description:string){
    return  this.directory.images?.find(i=> i.description ==description)?.base64;
  }

}
