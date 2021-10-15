import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router , Event as NavigationEvent, NavigationStart} from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RememberGuard implements CanActivate {

  event$:any;

  constructor(private authService: AuthService,
    private router: Router,
    private Location:Location) { }

    canActivate(): boolean {

      if(this.Location.path().includes("change-password")){
        //return true;
      }

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
