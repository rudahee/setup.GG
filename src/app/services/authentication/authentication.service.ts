import { EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { default as def } from 'firebase';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  logged = false;
  @Output() loggedEmitter = new EventEmitter<boolean>();

  userDB: AngularFireList<any>;

  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.isLogged()
  }

  async SignInWithGoogle() {
    const provider = new def.auth.GoogleAuthProvider()
    await this.angularFireAuth.signInWithPopup(provider).then (
      firebaseUser => {
        this.userDB = this.db.list('/users/'+firebaseUser.user.uid)

        sessionStorage.setItem('uid', firebaseUser.user.uid);

        this.userDB.push({
          'uid': firebaseUser.user.uid,
          'username': firebaseUser.user.displayName
        })
      }
    )
  }

  SignUp(user_email: string, password: string, nick: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(user_email, password).then(
      firebaseUser => {
        this.userDB = this.db.list('/users/'+firebaseUser.user.uid)

        sessionStorage.setItem('uid', firebaseUser.user.uid);

        this.userDB.push({
          'uid': firebaseUser.user.uid,
          'username': nick
        })
        this.SignIn(user_email, password);
      });
    }

  SignIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(
      firebaseUser => {
        sessionStorage.setItem('uid', firebaseUser.user.uid);
      }
    )
    this.setLogged(true)
  }

  SignOut() {
    this.angularFireAuth
    .signOut();
    this.setLogged(false);
    sessionStorage.clear();
  }

  isLogged() {
    this.loggedEmitter.emit(this.logged)
  }

  setLogged(status: boolean) {
    this.logged = status;
    this.isLogged();
  }

  deleteAccount() {
    this.angularFireAuth.currentUser.then(
      user => {
        user.delete()
      }
    )
    sessionStorage.clear();
    this.setLogged(false);
  }
}
