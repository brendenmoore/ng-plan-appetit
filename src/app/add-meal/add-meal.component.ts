import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models';
import { MealService } from '../services/meal.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css'],
})
export class AddMealComponent implements OnInit {
  recipes$?: Observable<Recipe[]>;
  mealName: string = '';
  selectedRecipes: Recipe[] = [];

  constructor(
    private mealService: MealService,
    private recipeService: RecipeService
  ) {
    this.recipes$ = this.recipeService
      .getRecipeList()
      ?.valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.mealService.addMeal(this.selectedRecipes).then(() => {
      this.selectedRecipes = [];
    });
  }

  async onTestClick() {
    // let testRecipe = await this.recipeService.getRecipeById('cgDmwL7wSOYF42dHlLcf');
    // let newMeal = await this.mealService.addMeal('Test Meal');
    // this.mealService.addRecipeToMeal('cgDmwL7wSOYF42dHlLcf', newMeal);
    console.log(this.selectedRecipes);
  }
}
