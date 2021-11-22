import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InvitationGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const isForm = state.url.includes("shared/form-member");

      if(isForm){
        let directoryId = Number(route.params.directoryId);
        let code = route.params.code;
        let type = route.params.type;
        const user = this.authService.userValue();
        if(user === null){
          this.router.navigate([ "/register/invitation" ,type ,code ,directoryId ]);
          return false;
        }
      }

    return true;
  }

}
