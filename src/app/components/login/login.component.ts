import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
/*
* Este componente tiene un Reactive Form para realizar un inicio de sesion a traves de email y contraseña.
* Tambien contiene el boton para realizar el inicio de sesion a traves de google pero
* !! Aunque se pueden crear setups y se guardan correctamente, pero dan errores que no se solucionar todavia.
*/

  logged = false; //Variable para saber si estas logueado
  hide = true; // Variable que controla si la contraseña se oculta o no.

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public authenticationService:AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    //Si existe un uid, significa que estamos loggeados.
    if(sessionStorage.getItem('uid') != undefined  ||  sessionStorage.getItem('uid') != null) {
      this.logged = true
    } else {
      this.logged = false;
    }
  }

  signIn() {
    /*
    * Obtiene los datos del formulario, y los envia al servicio, despues de un segundo te lleva a la pagina para modificar tu setup.
    */
    this.authenticationService.SignIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value)

    this.loginForm.controls.email.setValue('');
    this.loginForm.controls.password.setValue('');

    setTimeout(() => {
      if (this.authenticationService.displayName != undefined) {
        this.router.navigate(['/logged'])
      }
    },  2000) //El motivo es que es mas rapida la navegacion que el servicio.

  }

}
