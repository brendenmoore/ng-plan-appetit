import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Recipe } from '../models';
import { UserService } from '../user.service';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  userId?: string;
  recipes: AngularFirestoreCollection<Recipe>;

  constructor(private store: AngularFirestore, private user: UserService) {
    this.userId = this.user.uid;
    this.recipes = this.store.collection(
      'users/' + this.userId + '/recipes',
      (ref) => ref.orderBy('createdOn')
    );
  }

  getRecipeList(): AngularFirestoreCollection<Recipe> | undefined {
    return this.recipes;
  }

  getRecipeById(id: string) {
    return this.recipes.doc(id);
  }

  addRecipe(name: string) {
    return this.recipes.add({ createdOn: new Date(), name: name });
  }

  deleteRecipe(id: string) {
    return this.recipes.doc(id).delete()
  }
}
