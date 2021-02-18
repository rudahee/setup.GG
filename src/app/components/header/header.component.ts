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

  displayName;
  menu_open:boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isAuth()
    console.log(this.displayName)
  }

  /*
  * Se suscribe el eventEmmiter del servicio para obtener si estamos loggeados
  */


  /*
  * Nos permite cerrar sesion en el servicio a traves del boton de cerrar sesion
  */
  signOut() {
    this.authenticationService.SignOut();
    this.displayName=undefined;
  }

  isAuth() {
    this.displayName = this.authenticationService.GetCurrentUser()
  }

  authWithGoogle() {
    this.authenticationService.SignInWithGoogle();
    setTimeout(_ => {
      if (this.authenticationService.displayName != undefined) {
        this.displayName = "true"
      }
    }, 5000)
  }
}
