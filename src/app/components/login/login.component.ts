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

  logged = false;
  hide = true;

  loginForm = new FormGroup({
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

  signIn() {
    this.authenticationService.SignIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value)

    this.loginForm.controls.email.setValue('');
    this.loginForm.controls.password.setValue('');

    setTimeout(() => {this.router.navigate(['/my-setup'])},  1000)

  }

  signInWithGoogle() {
    this.authenticationService.SignInWithGoogle().then(
      res => {
        setTimeout(() => {this.router.navigate(['/my-setup'])},  1000)
        this.router.navigate(['/my-setup']);
      }
    );
  }
}
