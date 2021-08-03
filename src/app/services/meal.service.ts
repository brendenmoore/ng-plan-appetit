import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';
import { Meal, Recipe } from '../models';
import { UserService } from '../user.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  userId?: string;
  meals: AngularFirestoreCollection<Meal>;
  constructor(
    private store: AngularFirestore,
    private user: UserService,
    private recipe: RecipeService
  ) {
    this.userId = this.user.uid;
    this.meals = this.store.collection(
      'users/' + this.userId + '/meals',
      (ref) => ref.orderBy('createdOn')
    );
  }

  getMealList(): AngularFirestoreCollection<Meal> | undefined {
    return this.meals;
  }

  addMeal(name = "", recipeIds: string[] = []) {
    let recipes = recipeIds.map(recipe => { return {recipeId: recipe, order: 0}})
    return this.meals.add({ name: name, createdOn: new Date(), recipes: recipes });
  }

  addRecipeToMeal(recipeId: string, meal: DocumentReference<Meal>) {
    meal.update({ recipeIds: [recipeId] });
  }

  deleteMeal(id: string) {
    return this.meals.doc(id).delete();
  }
}
