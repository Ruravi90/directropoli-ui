import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

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
