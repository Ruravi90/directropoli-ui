import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
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
    this.token = this.route.snapshot.paramMap.get("token");
    if(this.token == null) this.router.navigate(['/login']);

    this.form = this.formBuilder.group(
      {
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]],
        password_confirmation: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.password_confirmation.value;

    return pass === confirmPass ? { notSame: false } : { notSame: true };
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.isLoading = true;
    this.isError = false;

    if (this.form.invalid) {
      if(this.form.errors!.notSame){
        this.isError = true;
      }

      this.isLoading = false;
      return;
    }

    let data = this.form.value;
    data.token = this.token;

    this.authService.change_password(data).then(r=>{
      if(this.form.value.rememberme){localStorage.setItem("isRememberMe","true");}
      this.isLoading = false;
      this.router.navigate([ '/dashboard/index' ]);
    }).catch(e=>{

      if(e.status == 401){
        this.notification.create(
          'warning',
          'Notification Title',
          e.error.message
        );
      }
      if(e.status == 400){
        this.notification.create(
          'warning',
          'Notification Title',
          e.error.message.password_confirmation[0]
        );
      }

      //console.log(e);
      this.isLoading = false;
      //this.isError = true;
    });
  }

}
