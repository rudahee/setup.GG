import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logged;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLogged()
  }

  isLogged() {
    this.authenticationService.loggedEmitter.subscribe(
      res => {
        this.logged = res;
      }
    );
  }

  signOut() {
    this.authenticationService.SignOut();
    sessionStorage.clear();
  }

  ngOnDestroy(): void {
    sessionStorage.clear()
    this.authenticationService.SignOut();
  }
}
