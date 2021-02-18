import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {


  displayName:string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.displayName = this.authenticationService.displayName;
  }

  delete() {
    this.authenticationService.deleteAccount();
  }

  logout() {
    this.authenticationService.SignOut();
  }

}
