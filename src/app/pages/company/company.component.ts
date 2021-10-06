import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService }  from '../../service/member.service';
import { Member }  from '../../models/member';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  id!:number;
  member:Member = Object.assign(new Member());
  constructor(
    private route: ActivatedRoute,
    private ms: MemberService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.ms.member(this.id).toPromise().then(r=>{
      this.member = r;
    });
  }

}
