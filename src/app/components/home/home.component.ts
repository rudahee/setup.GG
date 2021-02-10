import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authenticationService.logged) {
      sessionStorage.clear()
    }
  }

}
