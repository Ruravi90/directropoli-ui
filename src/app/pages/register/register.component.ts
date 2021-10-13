import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from '../../utils/Validation';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isError=false;
  isLoading=false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        checkPassword: ['', Validators.required]
      },
      {
        validators: [Validation.match('password', 'checkPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    this.authService.register(this.form.value).then(r=>{
      this.isLoading = false;
      this.router.navigate([ '/dashboard/index' ]);
    }).catch(e=>{
      this.isLoading = false;
      this.isError = true;
    });
  }

}
