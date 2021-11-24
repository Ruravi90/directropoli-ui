import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MemberService }  from '../../service/member.service';
import { CategoryService }  from '../../service/category.service';
import { PublicService }  from '../../service/public.service';
import { UtilService }  from '../../service/util.service';
import { AuthService }  from '../../auth/auth.service';
import { Member }  from '../../models/member';
import { Category }  from '../../models/category';
import { Directory }  from '../../models/directory';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NzUploadChangeParam,NzUploadFile } from 'ng-zorro-antd/upload';
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-form-member',
  templateUrl: './form-member.component.html',
  styleUrls: ['./form-member.component.scss']
})
export class FormMemberComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  isLoading = false;
  isBusy = true;
  loadDirectory = false;
  type!:string | null;
  code!:string | null;
  directoryId!:number;
  Id!:number;
  isEdit:boolean = false;
  member: Member = new Member();
  directory: Directory = new Directory();
  categories: Array<Category> = new Array<Category>() ;
  headeImageChangeEvent : any = '';
  headerImage : any = '';
  profileImageChangeEvent : any = '';
  profileImage : any = '';
  fileListHeader: NzUploadFile[] = [];
  fileListProfile: NzUploadFile[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ps: PublicService,
    private ms: MemberService,
    private us: UtilService,
    private as:AuthService,
    private cs: CategoryService) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get("type");
    this.code = this.route.snapshot.paramMap.get("code");
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.directoryId = Number(this.route.snapshot.paramMap.get("directoryId"));

    if(this.Id === 0){
      forkJoin([
        this.ps.categories().toPromise().then(r=>{ this.categories = r; }),
        this.ps.publicDirectory(this.directoryId).toPromise().then(r=>{this.directory = r;})
      ]).subscribe(allResults => {
        this.isBusy = false;
        this.member.directory_id = this.directoryId;
      });
    }
    else if(this.Id !== 0){
      this.isEdit = true;
      forkJoin([
        this.ps.categories().toPromise().then(r=>{ this.categories = r; }),
        this.ps.publicMember(this.Id).toPromise().then(r=>{ this.member = r; })
      ]).subscribe(allResults => {
        this.ps.publicDirectory(this.member.directory_id).toPromise().then(r=>{
          this.directory = r;
          this.isBusy = false;
        });
      });
    }

    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        short_description: ['',[Validators.required]],
        facebook: ['',[]],
        twitter: ['',[]],
        instagram: ['',[]],
        whatsapp: ['',[]],
        description: ['',[]],
        manager: ['',[Validators.required]],
        job_possion: ['',[]],
        address: ['',[]],
        email: ['',[Validators.required]],
        phone: ['',[Validators.required]],
        directory_id: ['', [Validators.required]],
        category_id: ['', [Validators.required]]
      }
    );

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getBase64(event:any) {
    let me = this;
    this.member.images = [];

    for (const file of event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.member.images?.push({ base64 : reader.result?.toString() });
        //me.modelvalue = reader.result;
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }

  handleHeaderChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'uploading') {
      this.headerImage = '';
      this.headeImageChangeEvent='';
      if(info.fileList.length > 0){
        this.headeImageChangeEvent = info.file.originFileObj;
      }
    }
    if (info.file.status === 'done') {
    }
    else if (info.file.status === 'error') {
    }
  }
  handleProfileChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'uploading') {
      this.profileImage = '';
      this.profileImageChangeEvent='';
      if(info.fileList.length > 0){
        this.profileImageChangeEvent = info.file.originFileObj;
      }
    }
    if (info.file.status === 'done') {
    }
    else if (info.file.status === 'error') {
    }
  }


  headeImageCropped(event: ImageCroppedEvent) {
    this.headerImage = event.base64;
  }

  profileImageCropped(event: ImageCroppedEvent) {
    this.profileImage = event.base64;
  }


  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    if(!this.isEdit)
      this.member.images = [];


    if(this.headerImage !== ''){
      this.member.images!.push({ base64 : this.headerImage, description:'header' });
    }
    else{
      this.member.images!.push({ base64 : this.us.defaultHeader, description:'header' });
    }

    if(this.profileImage !== ''){
      this.member.images!.push({ base64 : this.profileImage, description:'profile' });
    }
    else{
      this.member.images!.push({ base64 : this.us.defaultProfile, description:'profile' });
    }

    if(this.type === 'join' && !this.isEdit){
      this.member.user_id = this.as.userValue().user.id;

      this.ps.createMemberPublic(this.member).toPromise().then(r=>{
        this.isLoading = false;
        this.router.navigate([ '/private/members', this.directoryId]);
      }).catch(e=>{
        this.isLoading = false;
      });
    }
    else if(this.isEdit){
      this.ms.update(this.Id,this.member).toPromise().then(r=>{
        this.isLoading = false;
        this.router.navigate([ '/private/members', this.member.directory_id]);
      }).catch(e=>{
        this.isLoading = false;
      });
    }
    else{
      this.ms.create(this.member).toPromise().then(r=>{
        this.isLoading = false;
        this.router.navigate([ '/private/members', this.directoryId]);
      }).catch(e=>{
        this.isLoading = false;
      });
    }

  }

}
