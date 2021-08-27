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
import { Meal, Menu, Recipe, Template } from '../models';
import { UserService } from './user.service';
import { RecipeService } from './recipe.service';
import { generateUid, newMeal } from './util';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  userId?: string;
  meals: AngularFirestoreCollection<Meal>;
  template: AngularFirestoreDocument<Template>;
  constructor(
    private store: AngularFirestore,
    private user: UserService,
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

  createTemplate(template: Template) {
    return this.template.set(template);
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
    let meal = newMeal(recipes)
    return this.meals.add(meal);
  }

  addRecipeToMeal(recipe: Recipe, meal: DocumentReference<Meal>) {
    meal.update({ recipes: firebase.firestore.FieldValue.arrayUnion(recipe) });
  }

  deleteMeal(id: string) {
    return this.meals.doc(id).delete();
  }
}
