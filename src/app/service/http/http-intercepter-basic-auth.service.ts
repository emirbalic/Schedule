import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {
  constructor(private basicAuthenticationService: BasicAuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const username = this.basicAuthenticationService.getAuthenticatedUser();
    const basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    // const password = 'dummy';
    // console.log(username);
    // const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    // const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    if (basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    }
    return next.handle(request);
  }
}
