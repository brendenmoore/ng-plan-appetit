import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uid?: string;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.user.subscribe((user) => (this.uid = user?.uid));
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      this.router.navigate(["/recipes"]);
    });
  }
  logout() {
    this.auth.signOut();
  }
}
