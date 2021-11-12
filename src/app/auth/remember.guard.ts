import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router , Event as NavigationEvent, NavigationStart} from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './auth.service';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class RememberGuard implements CanActivate {

  event$:any;

  constructor(private authService: AuthService,
    private router: Router,
    private Location:Location) { }

    canActivate(): boolean {
      let isRememberMe = JSON.parse(localStorage.getItem("isRememberMe")!);
      const user = this.authService.userValue();

      if(isRememberMe && user !== null){
        this.authService.isAuthenticated().then(r=>{
          if(r.status == 400 || r.status == 401){
            localStorage.removeItem("SessionUser");
            this.router.navigateByUrl("/signin");
            return false;
          }

          this.router.navigateByUrl("/private/index");
          return true;
        }).catch(r=>{
          localStorage.removeItem("SessionUser");
          this.router.navigateByUrl("/signin");
          return false;
        });
      }

      return true;
    }

}
