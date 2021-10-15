import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isError=false;
  isLoading=false;
  token!:String|null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.isLoading = true;
    this.isError = false;

    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }

    this.authService.reset_password(this.form.value).then(r=>{
      this.isLoading = false;
      //this.router.navigate([ '/dashboard/index' ]);
    }).catch(e=>{
      this.isLoading = false;
      if(e.status == 400){
        this.notification.create(
          'warning',
          'Notification Title',
          e.error.message.password_confirmation[0]
        );
      }
    });
  }

}
