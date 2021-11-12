import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DirectoryService }  from '../../service/directory.service';
import { UtilService }  from '../../service/util.service';
import { Directory }  from '../../models/directory';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-form-directory',
  templateUrl: './form-directory.component.html',
  styleUrls: ['./form-directory.component.scss']
})
export class FormDirectoryComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  isLoading = false;
  editId:Number = 0;
  isEdit:boolean = false;
  directory : Directory = new Directory();
  headeImageChangeEvent : any = '';
  headerImage : any = '';
  profileImageChangeEvent : any = '';
  profileImage : any = '';


  constructor(
    private ds: DirectoryService,
    private us: UtilService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    ) { }

  ngOnInit(): void {
    this.editId = Number(this.route.snapshot.paramMap.get("Id"));

    this.ds.directory(this.editId).toPromise().then(r=>{
      this.directory = r;
      this.isEdit = true;
    });

    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['',[]],
      }
    );
  }

  getImg(type:String){
    return  this.directory.images?.find(i=> i.description == type)?.base64;
  }


  handleHeaderChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
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
    if (info.file.status !== 'uploading') {
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

    console.log(this.form);

    if (this.form.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    if(!this.isEdit)
      this.directory.images = [];

    if(this.headerImage !== ''){
      this.directory.images!.push({ base64 : this.headerImage, description:'header' });
    }
    else{
      this.directory.images!.push({ base64 : this.us.defaultHeader, description:'header' });
    }

    if(this.profileImage !== ''){
      this.directory.images!.push({ base64 : this.profileImage, description:'profile' });
    }
    else{
      this.directory.images!.push({ base64 : this.us.defaultProfile, description:'profile' });
    }

    if(!this.isEdit){
      this.ds.create(this.directory).toPromise().then(r=>{
        this.isLoading = false;
        this.router.navigate([ '/private/index' ]);
      }).catch(e=>{
        this.isLoading = false;
      });
    }
    else{
      this.ds.update(this.directory).toPromise().then(r=>{
        this.isLoading = false;
        this.router.navigate([ '/private/index' ]);
      }).catch(e=>{
        this.isLoading = false;
      });
    }
  }

}
