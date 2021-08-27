import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Recipe, RecipeDetails, Template } from '../models';
import { UserService } from './user.service';
import firebase from 'firebase/app';
import { DatabaseService } from './database.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  userId?: string;
  recipes: AngularFirestoreCollection<Recipe>;
  recipeDetails: AngularFirestoreCollection<RecipeDetails>;
  recipeArray: Recipe[] = [];
  categories: string[] = [];

  constructor(
    private store: AngularFirestore,
    private user: UserService,
    private databaseService: DatabaseService,
    private menuService: MenuService
  ) {
    this.userId = this.user.uid;
    this.recipes = this.store.collection(
      'users/' + this.userId + '/recipes',
      (ref) => ref.orderBy('createdOn')
    );
    this.recipeDetails = this.store.collection(
      'users/' + this.userId + '/recipeDetails'
    );
    this.recipes.valueChanges({idField: "id"}).subscribe(recipes => {
      this.recipeArray = recipes;
      recipes.forEach(recipe => {
        if (recipe.categories) {
          recipe.categories.forEach(category => {
            if (!this.categories.includes(category)) {
              this.categories.push(category)
            }
          })
        }
      })
      console.log(this.categories);
    })
  }

  getRecipeList(): AngularFirestoreCollection<Recipe> | undefined {
    return this.recipes;
  }

  getRecipeById(id: string) {
    console.log('called with id: ' + id);
    return this.recipes.doc(id);
  }

  getRecipeDetails(id: string) {
    return this.recipeDetails.doc(id);
  }

  getCategories() {
    return this.categories;
  }

  addRecipe(
    name: string,
    id : string = this.databaseService.generateUid(),
    notes: string = "",
    directions: string = "",
    ingredients: string[] = [],
    categories: string[] = [],
  ) {
    let batch = this.store.firestore.batch();
    let recipeRef = this.recipes.doc(id).ref;
    let recipeDetailsRef = this.recipeDetails.doc(id).ref;
    let newRecipe: Recipe = { id: id, name: name, createdOn: Date.now(), categories: categories };
    let newRecipeDetails: RecipeDetails = {
      id: id,
      notes: notes,
      directions: directions,
      ingredients: ingredients,
    };
    batch.set(recipeRef, newRecipe);
    batch.set(recipeDetailsRef, newRecipeDetails);

    return batch.commit();
  }

  // deleteRecipeOLD(id: string) {
  //   let batch = this.store.firestore.batch();
  //   let recipeRef = this.recipes.doc<Recipe>(id).ref;
  //   let recipeDetailsRef = this.recipeDetails.doc(id).ref;
  //   batch.delete(recipeRef);
  //   batch.delete(recipeDetailsRef);

  //   return batch.commit();
  // }

  async deleteRecipe(id: string) {
    let recipeRef = this.recipes.doc<Recipe>(id).ref;
    let recipeDetailsRef = this.recipeDetails.doc(id).ref;
    let templateRef = this.store.doc<Template>(
      'users/' + this.userId + '/template/template'
    ).ref;
    await this.menuService.deleteRecipeFromMenu(id)
    this.store.firestore.runTransaction(transaction => {
      return Promise.all([
        transaction.get(templateRef),

      ]).then(([template]) => {
        const scheduledMeals = [...(template.data()?.scheduledMeals || [])];
        const updatedScheduledMeals = scheduledMeals.map((meal) => {
          const updatedRecipes = meal.recipes.filter((recipe) => {
            return recipe.id !== id;
          });
          meal.recipes = updatedRecipes;
          return meal;
        });

        transaction.update(templateRef, {
          scheduledMeals: updatedScheduledMeals,
        });
        transaction.delete(recipeRef);
        transaction.delete(recipeDetailsRef);
      });
    })
  }


  async updateRecipeName(newRecipe: Recipe) {
    let recipeRef = this.recipes.doc<Recipe>(newRecipe.id).ref;
    let templateRef = this.store.doc<Template>(
      'users/' + this.userId + '/template/template'
    ).ref;
    await this.menuService.updateRecipeInMenu(newRecipe);
    this.store.firestore.runTransaction((transaction) => {
      return Promise.all([
        transaction.get(templateRef),
        transaction.get(recipeRef),
      ]).then(([template, recipe]) => {

        const scheduledMeals = [...(template.data()?.scheduledMeals || [])];
        const updatedScheduledMeals = scheduledMeals.map((meal) => {
          meal.recipes.forEach((recipe) => {
            if (recipe.id === newRecipe.id) {
              recipe.name = newRecipe.name;
              console.log("updated template")
            }
            return recipe;
          });
          return meal;
        });

        console.log(updatedScheduledMeals)

        transaction.update(templateRef, {scheduledMeals: updatedScheduledMeals})
        transaction.update(recipeRef, {name: newRecipe.name})

      });
    });
  }

  updateRecipeDetails(recipeDetails: RecipeDetails) {
    return this.getRecipeById(recipeDetails.id).update(recipeDetails);
  }
}
