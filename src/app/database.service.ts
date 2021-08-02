import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { UserService } from './user.service';

export interface Recipe {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  userId?: string;
  recipes: AngularFirestoreCollection<Recipe>;

  constructor(private store: AngularFirestore, private user: UserService) {
    this.userId = this.user.uid;
    this.recipes = this.store.collection("users/" + this.userId + '/recipes');
  }

  getRecipeList(): AngularFirestoreCollection<Recipe> | undefined {
    return this.recipes;
  }

  addRecipe(recipe: Recipe) {
    return this.recipes.add(recipe)
  }
}
