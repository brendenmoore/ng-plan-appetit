import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models';
import { RecipeService } from '../services/recipe.service';
import {
  MatDialog,
} from '@angular/material/dialog';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipeList$?: Observable<Recipe[]>;
  recipeView?: Recipe;

  constructor(private recipeService: RecipeService, public dialog: MatDialog) {
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

  openDialog(){
    const dialogRef = this.dialog.open(AddRecipeComponent);
  }

  showRecipe(recipe: Recipe) {
    this.recipeView = recipe;
  }

  hideRecipe() {
    this.recipeView = undefined;
  }

}
