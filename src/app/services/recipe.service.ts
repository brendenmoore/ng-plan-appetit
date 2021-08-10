import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Recipe, RecipeDetails } from '../models';
import { UserService } from '../user.service';
import firebase from 'firebase/app';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  userId?: string;
  recipes: AngularFirestoreCollection<Recipe>;
  recipeDetails: AngularFirestoreCollection<RecipeDetails>;

  constructor(
    private store: AngularFirestore,
    private user: UserService,
    private databaseService: DatabaseService
  ) {
    this.userId = this.user.uid;
    this.recipes = this.store.collection(
      'users/' + this.userId + '/recipes',
      (ref) => ref.orderBy('createdOn')
    );
    this.recipeDetails = this.store.collection(
      'users/' + this.userId + '/recipeDetails'
    );
  }

  getRecipeList(): AngularFirestoreCollection<Recipe> | undefined {
    return this.recipes;
  }

  getRecipeById(id: string) {
    return this.recipes.doc(id);
  }

  getRecipeDetails(id: string) {
    return this.recipeDetails.doc(id);
  }

  addRecipe(name: string, notes?: string, directions?: string, ingredients?: string[]) {
    let batch = this.store.firestore.batch();
    let id = this.databaseService.generateUid();
    let recipeRef = this.recipes.doc(id).ref;
    let recipeDetailsRef = this.recipeDetails.doc(id).ref;
    let newRecipe = new Recipe(name)
    let newRecipeDetails = new RecipeDetails(
      id,
      notes,
      directions,
      ingredients
    );
    batch.set(recipeRef, newRecipe.toObject());
    batch.set(recipeDetailsRef, newRecipeDetails.toObject());

    return batch.commit();
  }

  deleteRecipe(id: string) {
    let batch = this.store.firestore.batch();
    let recipeRef = this.recipes.doc<Recipe>(id).ref;
    let recipeDetailsRef = this.recipeDetails.doc(id).ref;
    batch.delete(recipeRef);
    batch.delete(recipeDetailsRef);

    return batch.commit();
  }


  updateRecipeDetails(recipeDetails: RecipeDetails) {
    return this.getRecipeById(recipeDetails.id).update(recipeDetails.toObject());
  }
}
