import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
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
      this.router.navigate(["/app/recipes"]);
    });
  }
  logout() {
    this.auth.signOut().then(result => {
      this.router.navigate(["/"])
    });
  }

  loginWithPassword(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(result => {
      this.router.navigate(["/app/recipes"]);
    });
  }

  register(){
    return this.auth.createUserWithEmailAndPassword("brendenm17+test@gmail.com", "testtestyay");
  }
}
