import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
/*
* Este componente tiene un Reactive Form para realizar el registro a traves de un nombre de usuario, email y contraseña.
*/

  hide = true; // Variable que controla si la contraseña se oculta o no.

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public authenticationService:AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  signUp() {
    //Obtiene los datos del formulario y los envia directamente al servicio.
    this.authenticationService.SignUp(
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.username.value);

    }
}
