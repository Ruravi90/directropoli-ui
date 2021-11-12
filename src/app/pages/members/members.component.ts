import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersPrivateComponent implements OnInit {
  directoryId!:Number;
  code!:String | null;
  directory: Directory | null = null;
  isSubmit:boolean = false;
  isCopied:boolean = false;

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

  getBaseUrl(){
    return window.location.origin;
  }

  getImg(description:string){
    return  this.directory!.images?.find(i=> i.description ==description)?.base64;
  }

  copyUrl() {

    if(navigator.clipboard) {
      navigator.clipboard.writeText(this.getBaseUrl()+ '/public/Invitation/' + this.directory!.shared_code).then(() => {
        this.message.create('success', `Link copiado`);
      })
    } else {
      this.message.create('error','Browser Not compatible')
    }
  }

  sharedWhatsapp(){
    window.open(
      "whatsapp://send?text=" + this.getBaseUrl()+ '/Invitation/' + this.directory!.shared_code,'_blank'
    );
  }

  confirmDelete(d: Directory){
    this.ds.delete(this.directoryId).toPromise().then(r=>{
      this.router.navigate([ '/private/index' ]);
    });
  }

  changeIsPublic($event:any){
    this.isSubmit = true;
    this.directory!.isPublic =  !this.directory!.isPublic;
    this.ds.changeIsPublic(this.directory!).toPromise().then(r=>{
      this.isSubmit = false;
      this.message.create('success', `El directorio ${ this.directory!.name } ahora es ${ this.directory!.isPublic ? 'publico' : 'privado' }`);
    }).catch(r=>{
      this.directory!.isPublic =  !this.directory!.isPublic;
      this.isSubmit = false;
    });
  }

}
