import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RememberGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) { }

    canActivate(): boolean {
      let isRememberMe = JSON.parse(localStorage.getItem("isRememberMe")!);

      if(isRememberMe){
        this.authService.isAuthenticated().then(r=>{
          this.router.navigateByUrl("/dashboard/index");
          return false;
        });
      }

      return true;
    }

}
