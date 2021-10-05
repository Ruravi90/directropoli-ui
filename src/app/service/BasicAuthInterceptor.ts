import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        const user = this.authService.userValue();
        const isApiUrl = request.url.startsWith(environment.apiBase);
        const isLogin = request.url.endsWith("login");
        const isRegister = request.url.endsWith("register");
        if (isApiUrl && !isLogin && !isRegister) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${user.token}`
              }
          });
        }

        return next.handle(request);
    }
}
