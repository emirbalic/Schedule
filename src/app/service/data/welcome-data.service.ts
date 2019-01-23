import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {
  constructor(private http: HttpClient) {}

  executeHelloWorldBeenService() {
    return this.http.get<{ message: string }>(
      'http://localhost:8080/hello-world-bean'
    );
  }

  executeHelloWorldBeenServiceWithPathVariable(name: string) {
    // const basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // const headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // });

    return this.http.get<{ message: string }>(
      `http://localhost:8080/hello-world-bean/path-variable/${name}`,
      // { headers }
    );
  }
  // createBasicAuthenticationHttpHeader() {
  //   const username = 'cato';
  //   const password = 'dummy';
  //   const basicAuthHeaderString =
  //     'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }
}
