import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
  private router: Router) { }

  canActivate(): boolean {

    this.authService.isAuthenticated().then((r:any)=>{
      if(r.status == 400 || r.status == 401){
        localStorage.removeItem("SessionUser");
        this.router.navigateByUrl("/login");
        return false;
      }
      return true
    }).catch(r=>{
      localStorage.removeItem("SessionUser");
      this.router.navigateByUrl("/login");
      return false;
    });

    return true;
  }
}
