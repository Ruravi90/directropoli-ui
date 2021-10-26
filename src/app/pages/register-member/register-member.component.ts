import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MemberService }  from '../../service/member.service';
import { CategoryService }  from '../../service/category.service';
import { DirectoryService }  from '../../service/directory.service';
import { Member }  from '../../models/member';
import { Category }  from '../../models/category';
import { Directory }  from '../../models/directory';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.scss']
})
export class RegisterMemberComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  isLoading = false;
  loadDirectory = false;
  directoryId!:number;
  member: Member = Object.assign(new Member());
  directory: Directory = Object.assign(new Directory());
  categories: Array<Category> = new Array<Category>() ;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private ms: MemberService,
    private ds: DirectoryService,
    private cs: CategoryService) { }

  ngOnInit(): void {
    this.directoryId = Number(this.route.snapshot.paramMap.get("directoryId"));
    this.ds.directory(this.directoryId).toPromise().then(r=>{
      this.directory = r;
      this.loadDirectory = true;
    });



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
    this.cs.categories().toPromise().then(r=>{
      this.categories = r;
    });



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

  onSubmit(): void {
    this.submitted = true;

    console.log(this.form);

    if (this.form.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.member.name = this.form.value.name;
    this.member.short_description = this.form.value.short_description;
    this.member.facebook = this.form.value.facebook;
    this.member.twitter = this.form.value.twitter;
    this.member.instagram = this.form.value.instagram;
    this.member.whatsapp = this.form.value.whatsapp;
    this.member.description = this.form.value.description;
    this.member.manager = this.form.value.manager;
    this.member.job_possion = this.form.value.job_possion;
    this.member.address = this.form.value.address;
    this.member.email = this.form.value.email;
    this.member.phone = this.form.value.phone;
    this.member.directory_id = this.form.value.directory_id;
    this.member.category_id = this.form.value.category_id;


    this.ms.create(this.member).toPromise().then(r=>{
      this.isLoading = false;
      this.router.navigate([ '/dashboard/members', this.directoryId]);
    }).catch(e=>{
      this.isLoading = false;
    });
  }

}
