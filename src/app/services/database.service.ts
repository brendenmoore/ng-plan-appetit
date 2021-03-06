import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { UserService } from './user.service';
import firebase from 'firebase/app';
import { Recipe } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  userId?: string;

  constructor(private store: AngularFirestore, private user: UserService) {
    this.userId = this.user.uid;
  }

  generateUid(): string {
    return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
  }


}
