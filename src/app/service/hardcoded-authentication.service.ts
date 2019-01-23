import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {
  constructor() {}

  authenicate(username, password) {
    if (username === 'cato' && password === 'dummy') {
      sessionStorage.setItem('authencatedUser', username);
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('authencatedUser');
    return !(user === null);
  }

  logoutUser() {
    if (!this.isUserLoggedIn) {
      return;
    } else {
      sessionStorage.removeItem('authencatedUser');
    }
  }
}
