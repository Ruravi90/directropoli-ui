import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService }  from '../../service/public.service';
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
    private ps: PublicService,
    ) { }

  ngOnInit(): void {
    this.directoryId = Number(this.route.snapshot.paramMap.get("directoryId"));
    this.code = this.route.snapshot.paramMap.get("code");

    if(this.directoryId !== 0 && this.directoryId !== null){
      this.ps.publicWithMembers(this.directoryId).toPromise().then(r=>{
        this.directory = r[0];
      });
    }

    if(this.code !== '' && this.code !== null){
      this.ps.getForCodeDirectory(this.code!).toPromise().then(r=>{
        this.directory = r;
      });
    }


  }

  getImg(description:string){
    return  this.directory!.images?.find(i=> i.description ==description)?.base64;
  }

}
