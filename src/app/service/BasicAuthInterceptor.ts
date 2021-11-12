import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor ,HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private router: Router,private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        const user = this.authService.userValue();
        const isApiUrl = request.url.startsWith(environment.apiBase);
        const isLogin = request.url.endsWith("login");
        const isRegister = request.url.endsWith("register");
        const isPublic = request.url.includes("public");

        if (isApiUrl && !isLogin && !isRegister && !isPublic && user !== null) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${user.token}`
              }
          });
        }

        return next.handle(request).pipe(
          /*
          tap(evt => {
              if (evt instanceof HttpResponse) {
                console.log(evt);
              }
          }),
          */
          catchError((error:any) => {
            if(error.status == 401){
              localStorage.removeItem("SessionUser");
              this.router.navigateByUrl("/signin");
            }
            return of(error);
          }));
    }
}
