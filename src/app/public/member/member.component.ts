import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService }  from '../../service/public.service';
import { Member }  from '../../models/member';
import { Directory }  from '../../models/directory';
import { MemberImages } from 'src/app/models/member_images';
import * as moment from 'moment';

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
  code:String | null = null;
  moment: any = moment;

  constructor(
    private route: ActivatedRoute,
    private ps: PublicService,
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.code = this.route.snapshot.paramMap.get("code");

    if(this.id !== 0 && this.id !== null){
      this.ps.publicMember(this.id).toPromise().then(r=>{
        this.member = r;
      });
    }

    if(this.code !== '' && this.code !== null){
      this.ps.getForCodeMember(this.code!).toPromise().then(r=>{
        this.member = r;
      });
    }
  }

  getImg(description:string){
    return  this.member!.images?.find(i=> i.description ==description)?.base64;
  }

  getMultimedia(description:string): Array<MemberImages>{
    return  this.member!.images!.filter(i=> i.description ==description);
  }


}
