import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token';
export const AUTHENICATED_USER = 'authencatedUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  constructor(private http: HttpClient) {}

  // authenicate(username, password) {
  //   if (username === 'cato' && password === 'dummy') {
  //     sessionStorage.setItem('authencatedUser', username);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  executeAuthenicationService(username, password) {
    const basicAuthHeaderString =
      'Basic ' + window.btoa(username + ':' + password);

    // const basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // console.log(username, password);

    const headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    console.log(headers);

    return this.http
      .get<{ AuthenticationBean }>(`${API_URL}/basicauth`, {
        headers
      })
      .pipe(
        map(data => {
          sessionStorage.setItem(AUTHENICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        })
      );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(AUTHENICATED_USER);
    return !(user === null);
  }

  logoutUser() {
    if (!this.isUserLoggedIn) {
      return;
    } else {
      sessionStorage.removeItem(AUTHENICATED_USER);
      sessionStorage.removeItem(TOKEN);
    }
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
