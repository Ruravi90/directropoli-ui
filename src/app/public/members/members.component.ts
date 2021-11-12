import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersPublicComponent implements OnInit {

  directoryId:number| null = null;
  code:String | null = null;
  directory: Directory | null = null;

  constructor(
    private route: ActivatedRoute,
    private ds: DirectoryService,
    ) { }

  ngOnInit(): void {
    this.directoryId = Number(this.route.snapshot.paramMap.get("directoryId"));
    this.code = this.route.snapshot.paramMap.get("code");

    if(this.directoryId !== 0 && this.directoryId !== null){
      this.ds.publicWithMembers(this.directoryId).toPromise().then(r=>{
        this.directory = r[0];
      });
    }

    if(this.code !== '' && this.code !== null){
      this.ds.getForCode(this.code!).toPromise().then(r=>{
        this.directory = r;
      });
    }


  }

  getImg(description:string){
    return  this.directory!.images?.find(i=> i.description ==description)?.base64;
  }

}
