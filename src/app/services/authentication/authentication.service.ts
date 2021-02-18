import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { default as def } from 'firebase';
import { User } from 'src/app/interfaces/Interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
/*
* Este servicio se encarga de la gestion de los usuarios.
*/
  displayName: string;
  user: User;

  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
  }

  public SignInWithGoogle() {
    /*
    * Inicio de sesion con google a traves de un pop-up
    */

    this.angularFireAuth.signInWithPopup(new def.auth.GoogleAuthProvider()).then(
      firebaseUser => {
        // Guardamos el usuario con su uid en la base de datos y en el sessionStorage.
        this.displayName = firebaseUser.user.displayName;
        setTimeout(_ => this.router.navigate(['/logged']), 1000)
      }
    ).catch (
      reject => {
        Swal.fire({
          title: "Error",
          text: reject,
          icon: "error"
        })
      }
    )
  }

  SignUp(user_email: string, password: string, nick: string) {
    /*
    * Registro a traves de email y contraseña.
    */
    this.angularFireAuth.createUserWithEmailAndPassword(user_email, password)
    .then(
      res => {
        res.user.updateProfile({
          displayName: nick
        });

        Swal.fire({
          title: "Success",
          text: "Register Success",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Login now!",
          showCancelButton: true,
          cancelButtonText: "Close"
        }).then(
          result => {
            if (result.isConfirmed) {
              this.SignIn(user_email, password)
            }
          }
        )
      }
    )
    .catch(
      reject => {
        Swal.fire({
          title: "Error",
          text: reject,
          icon: "error"
        });
      }
    )
  }

  SignIn(email: string, password: string) {
    /*
    * Inicio de sesion a traves de email y contraseña.
    */
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(
        firebaseUser => {
          this.angularFireAuth.currentUser.then(
            fbUser => {
              this.displayName = fbUser.displayName;
            }
          );
          setTimeout(_ => this.router.navigate(['/logged']), 1000)
        }
      ).catch (
        reject => {
          Swal.fire({
            title: "Error",
            text: reject,
            icon: "error"
          })
        }
      )
    //Pone el estado de loggeado a true, y emite los cambios.
  }

  SignOut() {
    /*
    * Este metodo permite cerrar la sesion, y emite los cambios correspondientes en logged y borra el sesionStorage
    */
    this.angularFireAuth.signOut
    this.displayName = undefined;
    this.router.navigate(['/home']);

  }

  deleteAccount() {
    /*
    * Para borrar la cuenta de un usuario, obtenemos el usuario, y si se obtiene satisfactoriamente,
    * la hacemos borrar, pero no lo que guardamos en la base de datos, ponemos logged a false, y borrarmos el sessionStorage
    */
    this.angularFireAuth.currentUser.then(
      user => {
        Swal.fire({
          title: "Warning!",
          text: "Are you sure to delete this account?",
          icon: "warning",
          showConfirmButton: true,
          confirmButtonText: "Yes I want",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          allowEscapeKey: false,
          allowOutsideClick: false
        }).then(
          result => {
            if (result.isConfirmed) {
              this.router.navigate(['/home'])
              this.displayName = undefined;
        }})
          user.delete()
      }
    )
  }

  public GetCurrentUser(): string {
    let displayName;
    this.angularFireAuth.currentUser.then(
      userFB => {
        if (userFB != null) {
          displayName = userFB.displayName;
        } else {
          displayName = undefined;
        }
      }
    );

    return displayName;
  }
}
