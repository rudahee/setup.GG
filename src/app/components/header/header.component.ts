import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
/*
* Componente del header, donde estan los accesos directos a otras varias paginas. Este componente siempre esta presente.
*/

  logged; //Esta variable controla si existe un usuario logeado, cambia el icono de login/logout

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLogged()
  }

  /*
  * Se suscribe el eventEmmiter del servicio para obtener si estamos loggeados
  */
  isLogged() {
    this.authenticationService.loggedEmitter.subscribe(
      res => {
        this.logged = res;
      }
    );
  }

  /*
  * Nos permite cerrar sesion en el servicio a traves del boton de cerrar sesion
  */
  signOut() {
    this.authenticationService.SignOut();
    sessionStorage.clear();
  }

}
