import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  directoryId!:number;
  directory: Directory | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ds: DirectoryService,
    private message: NzMessageService
    ) { }

  ngOnInit(): void {
    this.directoryId = Number(this.route.snapshot.paramMap.get("directoryId"));
    this.ds.withMembers(this.directoryId).toPromise().then(r=>{
      this.directory = r[0];
    });
  }

  getImg(description:string){
    return  this.directory!.images?.find(i=> i.description ==description)?.base64;
  }

  confirmDelete(d: Directory){
    this.ds.delete(this.directoryId).toPromise().then(r=>{
      this.router.navigate([ '/private/index' ]);
    });
  }

  changeIsPublic($event:any){

    this.directory!.isPublic = !this.directory!.isPublic;

    this.ds.changeIsPublic(this.directory!).toPromise().then(r=>{
      this.message.create('success', `El directorio ${ this.directory!.name } ahora es ${ this.directory!.isPublic ? 'publico' : 'privado' }`);
    });
  }

}
