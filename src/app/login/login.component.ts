import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage = 'Not valid credentials';
  invalidLogin = false;

  constructor(
    private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService
  ) {}

  ngOnInit() {}

  handleLogin(username: string, password: string) {
      if (this.hardcodedAuthenticationService.authenicate(this.username, password)) {
        this.invalidLogin = false;
        this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
    }
  }

  handleBasicAuthLogin() { // username: string, password: string
    // console.log(this.username, this.password);

    this.basicAuthenticationService.executeAuthenicationService(this.username, this.password)
    .subscribe(
      result => {
        console.log(result);
        this.router.navigate(['welcome', this.username]);
      },
      error => {
        console.log('Login failed!' + error);
        this.invalidLogin = true;
      }
    );
}
}
