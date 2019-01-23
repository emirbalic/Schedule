import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  welcomeText: string;
  springMessage: string;
  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params['name']) {
      this.welcomeText = this.route.snapshot.params['name'];
    } else {
      this.welcomeText = 'Guest';
    }
  }
  onGetWelcome() {
    // console.log('Welcome is coming');
    // console.log(this.service.executeHelloWorldBeenService());
    this.service
      .executeHelloWorldBeenService()
      .subscribe(
        response => this.handleSuccessfulResponse(response),
        error => this.handleErrorResponse(error)
      );
    console.log('End of getWelcome()');
  }

  onGetWelcomeWithParameter() {
    this.service
      .executeHelloWorldBeenServiceWithPathVariable(this.welcomeText)
      .subscribe(
        response => this.handleSuccessfulResponse(response),
        error => this.handleErrorResponse(error)
      );
  }

  handleErrorResponse(error) {
    // console.log(error.error);
    this.springMessage = error.error.message;
  }
  handleSuccessfulResponse(response) {
    // console.log(response.message);
    // console.log(response);
    this.springMessage = response.message;
  }
}
