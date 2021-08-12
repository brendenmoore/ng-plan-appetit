import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meal, Recipe, Template } from '../models';
import { UserService } from '../user.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  userId?: string;
  meals: AngularFirestoreCollection<Meal>;
  template: AngularFirestoreDocument<Template>;
  mealArray: Meal[] = [];
  constructor(
    private store: AngularFirestore,
    private user: UserService,
    private recipeService: RecipeService
  ) {
    this.userId = this.user.uid;
    this.template = this.store.doc<Template>(
      'users/' + this.userId + '/template/template'
    );
    this.meals = this.store.collection<Meal>(
      'users/' + this.userId + '/meals',
      (ref) => ref.orderBy('createdOn')
    );
  }

  getMealArray(): Meal[] {
    return this.mealArray;
  }

  createTemplate(template: Template) {
    return this.template.set({
      unscheduledMeals: template.unscheduledMeals,
      scheduledMeals: template.scheduledMeals,
    });
  }

  getTemplate(): Observable<Template | undefined> {
    return this.template.valueChanges();
  }

  updateTemplate(template: Template) {
    return this.template.update({
      unscheduledMeals: template.unscheduledMeals,
      scheduledMeals: template.scheduledMeals,
    });
  }

  getMealList(): AngularFirestoreCollection<Meal> | undefined {
    return this.meals;
  }

  addMeal(recipes?: Recipe[]) {
    return this.meals.add(new Meal(recipes));
  }

  addRecipeToMeal(recipe: Recipe, meal: DocumentReference<Meal>) {
    meal.update({ recipes: firebase.firestore.FieldValue.arrayUnion(recipe) });
  }

  deleteMeal(id: string) {
    return this.meals.doc(id).delete();
  }
}
