import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  member:Member | null = null;
  directories: Array<Directory> = new Array<Directory>() ;

  constructor(
    private router: Router,
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

  confirmDelete(m:Member ){
    this.ms.delete(m.id!).toPromise().then(r=>{
      this.router.navigate([ '/dashboard/members',this.id ]);
    });
  }

  getBase64(event:any) {
    for (const file of event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.member!.images?.push({ base64 : reader.result?.toString() });
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }

    this.ms.addImages(this.member!).toPromise().then(r=>{
    }).catch(e=>{
    });
  }


}
