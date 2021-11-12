import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService }  from '../../service/member.service';
import { Member }  from '../../models/member';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';
import { MemberImages } from 'src/app/models/member_images';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberPublicComponent implements OnInit {

  id!:number;
  member:Member = new Member();
  directories: Array<Directory> = new Array<Directory>() ;
  isVisiblePromotion = false;
  isConfirmLoading = false;
  tempMultimedia = false;

  constructor(
    private route: ActivatedRoute,
    private ms: MemberService,
    private ds: DirectoryService,
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.ms.publicMember(this.id).toPromise().then(r=>{
      this.member = r;
    });
  }

  getImg(description:string){
    return  this.member!.images?.find(i=> i.description ==description)?.base64;
  }

  getMultimedia(description:string): Array<MemberImages>{
    return  this.member!.images!.filter(i=> i.description ==description);
  }


}
