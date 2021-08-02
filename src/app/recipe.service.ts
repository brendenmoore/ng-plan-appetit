import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private auth: AngularFireAuth) { }


}
