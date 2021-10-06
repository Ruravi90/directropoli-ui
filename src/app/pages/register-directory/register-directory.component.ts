import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DirectoryService }  from '../../service/directory.service';
import { Directory }  from '../../models/directory';

@Component({
  selector: 'app-register-directory',
  templateUrl: './register-directory.component.html',
  styleUrls: ['./register-directory.component.scss']
})
export class RegisterDirectoryComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  isLoading = false;
  directory: Directory = Object.assign(new Directory());

  constructor(
    private ds: DirectoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['',[]],
        base64: ['', [Validators.required]],
      }
    );
  }

  getBase64(event:any) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.directory.images = [];
      this.directory.images.push({ base64 : reader.result?.toString() });
      //me.modelvalue = reader.result;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  onSubmit(): void {
    this.submitted = true;

    console.log(this.form);

    if (this.form.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.directory.name = this.form.value.name;
    this.directory.description = this.form.value.description;

    this.ds.create(this.directory).toPromise().then(r=>{
      this.isLoading = false;
      this.router.navigate([ '/dashboard/index' ]);
    }).catch(e=>{
      this.isLoading = false;
    });
  }

}
