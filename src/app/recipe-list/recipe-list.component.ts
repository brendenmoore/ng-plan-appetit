import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipeList$?: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {
    this.recipeList$ = this.recipeService
      .getRecipeList()
      ?.valueChanges({idField: "id"});
  }

  ngOnInit(): void {}

  onDelete(recipe: Recipe) {
    if (recipe.id) {
      this.recipeService.deleteRecipe(recipe.id);
    }
  }

  onTestClick(recipe: Recipe) {
    console.log(recipe)
  }
}
