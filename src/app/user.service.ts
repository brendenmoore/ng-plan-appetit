import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uid?: string;

  constructor(private auth: AngularFireAuth) {
    this.auth.user.subscribe((user) => (this.uid = user?.uid));
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }
}
