import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
/*
* Componente Home. Es principalmente estetico, Lo unico que hace es borrar el sessionStorage, si quedara algun
* rastro despues de cerrar sesion
*/

  constructor(public authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authenticationService.logged) {
      sessionStorage.clear()
    }
  }

}
