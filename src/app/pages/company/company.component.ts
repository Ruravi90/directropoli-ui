import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService }  from '../../service/member.service';
import { Member }  from '../../models/member';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  id!:number;
  member:Member = Object.assign(new Member());
  directories: Array<Directory> = new Array<Directory>() ;

  constructor(
    private route: ActivatedRoute,
    private ms: MemberService,
    private ds: DirectoryService,
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.ms.member(this.id).toPromise().then(r=>{
      this.member = r;
    });

    this.ds.directories().toPromise().then(r=>{
      this.directories = r;
    });
  }

}
