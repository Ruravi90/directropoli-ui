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
    const user = this.authService.userValue();

    if(user === null){
      localStorage.removeItem("SessionUser");
      this.router.navigateByUrl("/signin");
      return false;
    }

    return true;
  }
}
