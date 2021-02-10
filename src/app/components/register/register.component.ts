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

  logged = false;
  hide = true;

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public authenticationService:AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('uid') != undefined  ||  sessionStorage.getItem('uid') != null) {
      this.logged = true
    } else {
      this.logged = false;
    }
  }
  signUp() {
    this.authenticationService.SignUp(this.registerForm.controls.email.value,
      this.registerForm.controls.password.value, this.registerForm.controls.username.value);

    this.router.navigate(['/my-setup']);
    }
}
