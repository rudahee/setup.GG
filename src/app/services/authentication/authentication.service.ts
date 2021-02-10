import { EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { default as def } from 'firebase';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
/*
* Este servicio se encarga de la gestion de los usuarios.
*/

  // EventEmitter para el header.
  logged = false;
  @Output() loggedEmitter = new EventEmitter<boolean>();

  userDB: AngularFireList<any>;

  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.isLogged()
  }

  async SignInWithGoogle() {
    /*
    * Inicio de sesion con google a traves de un pop-up
    */
    const provider = new def.auth.GoogleAuthProvider()
    await this.angularFireAuth.signInWithPopup(provider).then(
      firebaseUser => {
        // Guardamos el usuario con su uid en la base de datos y en el sessionStorage.
        this.userDB = this.db.list('/users/'+firebaseUser.user.uid)

        sessionStorage.setItem('uid', firebaseUser.user.uid);

        //Pone el estado de loggeado a true, y emite los cambios.
        this.setLogged(true)

        this.userDB.push({
          'uid': firebaseUser.user.uid,
          'username': firebaseUser.user.displayName
        })
      }
    )
  }

  SignUp(user_email: string, password: string, nick: string) {
    /*
    * Registro a traves de email y contraseña.
    */
    this.angularFireAuth.createUserWithEmailAndPassword(user_email, password).then(
      firebaseUser => {
        // Guardamos el usuario en la base de datos y en el sessionStorage.
        this.userDB = this.db.list('/users/'+firebaseUser.user.uid)

        sessionStorage.setItem('uid', firebaseUser.user.uid);

        this.userDB.push({
          'uid': firebaseUser.user.uid,
          'username': nick
        })

        // Una vez registrados, llamamos al login, para que se loguee automaticamente.
        this.SignIn(user_email, password);
      });
    }

  SignIn(email: string, password: string) {
    /*
    * Inicio de sesion a traves de email y contraseña.
    */
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(
      firebaseUser => {
        // Cuando se inicie sesion correctamente, guarda el uid del usuario en el sessionStorage.
        sessionStorage.setItem('uid', firebaseUser.user.uid);
      }
    )
    //Pone el estado de loggeado a true, y emite los cambios.
    this.setLogged(true)
  }

  SignOut() {
    /*
    * Este metodo permite cerrar la sesion, y emite los cambios correspondientes en logged y borra el sesionStorage
    */
    this.angularFireAuth
    .signOut();
    this.setLogged(false);
    sessionStorage.clear();
  }

  isLogged() {
    //Emite los cambios en logged
    this.loggedEmitter.emit(this.logged)
  }

  setLogged(status: boolean) {
    //Cambia el estado de logged y llama al metodo que emite los cambios.
    this.logged = status;
    this.isLogged();
  }

  deleteAccount() {
    /*
    * Para borrar la cuenta de un usuario, obtenemos el usuario, y si se obtiene satisfactoriamente,
    * la hacemos borrar, pero no lo que guardamos en la base de datos, ponemos logged a false, y borrarmos el sessionStorage
    */
    this.angularFireAuth.currentUser.then(
      user => {
        user.delete()
      }
    )
    sessionStorage.clear();
    this.setLogged(false);
  }
}
