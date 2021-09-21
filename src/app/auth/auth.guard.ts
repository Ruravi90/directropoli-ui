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

    this.authService.isAuthenticated().catch(r=>{
      localStorage.removeItem("SessionUser");
      this.router.navigateByUrl("/landing");
      return false;
    });

    return true;
  }
}
