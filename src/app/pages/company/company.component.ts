import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService }  from '../../service/member.service';
import { Member }  from '../../models/member';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';
import { MemberImages } from 'src/app/models/member_images';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import * as moment from 'moment';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  id!:number;
  member:Member | null = null;
  directories: Array<Directory> = new Array<Directory>() ;
  formPromotion!: FormGroup;
  tempBase64: string ='';
  isVisiblePromotion = false;
  isConfirmLoading = false;
  tempMultimedia = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
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

    this.formPromotion = this.formBuilder.group(
      {
        validity: ['', [Validators.required]],
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


  confirmDelete(m:Member ){
    this.ms.delete(m.id!).toPromise().then(r=>{
      this.router.navigate([ '/private/members',this.id ]);
    });
  }

  handleChangeMultimedia({ file, fileList }: NzUploadChangeParam): void  {

    const status = file.status;
    if (status !== 'uploading') {
      if(this.member!.images == null){
        this.member!.images = [];
      }

      for (const file of fileList) {
        let reader = new FileReader();
        reader.readAsDataURL(file.originFileObj!);
        reader.onload = () => {
          this.member!.images?.push({ id:null, base64 : reader.result?.toString(), description: 'multimedia' });
          this.ms.addImages(this.member!).toPromise();
        };
        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
      }
    }


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

    this.member!.promotions!.push({
      id:null,
      base64 :  this.tempBase64,
      description: this.formPromotion.value.description ,
      validity: moment(this.formPromotion.value.validity).format("YYYY/MM/DD hh:mm:ss")
    });



    this.ms.addPromotions(this.member!).toPromise().then(r=>{
      this.isVisiblePromotion = false;
      this.formPromotion.reset();
    });


  }

}
