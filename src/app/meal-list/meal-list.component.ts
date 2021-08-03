import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meal } from '../models';
import { MealService } from '../services/meal.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent implements OnInit {
  mealList$?: Observable<Meal[]>;
  constructor(
    private mealService: MealService,
    private recipeService: RecipeService
  ) {
    this.mealList$ = this.mealService
      .getMealList()
      ?.valueChanges({ idField: 'id' })
      .pipe(
        map((meals) => {
          return meals.map((meal) => {
            let recipes = meal.recipes;
            for (let recipe of recipes) {
              this.recipeService.getRecipeById(recipe.recipeId).get().subscribe(result => {
                recipe.name = result.data()?.name;
              });
            }
            return { ...meal, recipes: recipes };
          });
        })
      );
  }

  ngOnInit(): void {}

  onDelete(meal: Meal) {
    if (meal.id) {
      this.mealService.deleteMeal(meal.id);
    }
  }

  onLog(meal: Meal){
    console.log(meal)
  }

}
