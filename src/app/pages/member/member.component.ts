import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService }  from '../../service/member.service';
import { Member }  from '../../models/member';
import { DirectoryService }  from '../../service/directory.service';
import { UtilService }  from '../../service/util.service';
import { Directory }  from '../../models/directory';
import { MemberImages } from 'src/app/models/member_images';
import { NzUploadChangeParam,NzUploadFile } from 'ng-zorro-antd/upload';

import { NzMessageService } from 'ng-zorro-antd/message';
import * as moment from 'moment';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberPrivateComponent implements OnInit {

  id!:number;
  member:Member | null = null;
  directories: Array<Directory> = new Array<Directory>() ;
  formPromotion!: FormGroup;
  tempBase64: string ='';
  isVisiblePromotion = false;
  isConfirmLoading = false;
  tempMultimedia = false;
  tempFileList: NzUploadFile[] = [];
  moment: any = moment;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ms: MemberService,
    private ds: DirectoryService,
    public us: UtilService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.ms.member(this.id).toPromise().then(r=>{
      this.member = r;
    });

    this.ds.directories().toPromise().then(r=>{
      this.directories = r;
    });

    this.formPromotion = this.formBuilder.group(
      {
        validity_ini: ['', [Validators.required]],
        validity_end: ['', [Validators.required]],
        description: ['',[Validators.required]]
      }
    );
  }


  get fPromotions(): { [key: string]: AbstractControl } {
    return this.formPromotion.controls;
  }

  getImg(description:string){
    return  this.member!.images?.find(i=> i.description ==description)?.base64;
  }

  getMultimedia(description:string): Array<MemberImages>{
    return  this.member!.images!.filter(i=> i.description ==description);
  }

  getBaseUrl(){
    return window.location.origin + '/shared/member/' + this.member!.shared_code;
  }

  copyUrl() {

    if(navigator.clipboard) {
      navigator.clipboard.writeText(this.getBaseUrl()).then(() => {
        this.message.create('success', `Link copiado`);
      })
    } else {
      this.message.create('error','Browser Not compatible')
    }
  }

  sharedWhatsapp(){
    window.open(
      "whatsapp://send?text=" + this.getBaseUrl(),'_blank'
    );
  }


  confirmDelete(m:Member ){
    this.ms.delete(m.id!).toPromise().then(r=>{
      this.router.navigate([ '/private/members',this.id ]);
    });
  }

  beforeUploadPromotions = (file: NzUploadFile): boolean => {
    this.tempFileList = this.tempFileList.concat(file);
    return false;
  };

  uploadFile($event:any) {
    Array.from( $event.target.files).forEach((file:any) => {
      let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let image = { id:null, base64 : reader.result?.toString(), description: 'multimedia' };
          this.ms.addImages(this.member?.id!, image).toPromise().then(r=>{
            this.member!.images?.push(image);
          });
        };
        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
    });
  }

  handleChangePromotion(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      if(info.fileList.length > 0){
        let reader = new FileReader();
        reader.readAsDataURL(info.file.originFileObj!);
        reader.onload = () => {
          this.tempBase64 = reader.result!.toString();
        };
        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
      }
    }
  }

  handlePromotionCancel(){
    this.isVisiblePromotion = false;
  }

  onSubmitPromotion(){
    for (const i in this.formPromotion.controls) {
      if (this.formPromotion.controls.hasOwnProperty(i)) {
        this.formPromotion.controls[i].markAsDirty();
        this.formPromotion.controls[i].updateValueAndValidity();
      }
    }

    if (this.formPromotion.invalid) {
      return;
    }

    this.isConfirmLoading = true;

    if(this.member!.promotions == null){
      this.member!.promotions = [];
    }

    this.tempFileList.forEach((file: any) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let promotion ={
          id:null,
          base64 :  reader.result?.toString(),
          description: this.formPromotion.value.description ,
          validity_ini: moment(this.formPromotion.value.validity_ini).format("YYYY/MM/DD hh:mm:ss"),
          validity_end: moment(this.formPromotion.value.validity_end).format("YYYY/MM/DD hh:mm:ss")
        };
        this.ms.addPromotions(this.member?.id!, promotion).toPromise().then(r=>{
          this.isConfirmLoading = false;
          this.isVisiblePromotion = false;
          this.tempFileList = [];
          this.formPromotion.reset();
          this.member?.promotions?.push(promotion);
        });
      };
      reader.onerror = (error) => {
        this.tempFileList = [];
        return;
      };
    });


  }

  sleep(milliseconds: Number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

}
