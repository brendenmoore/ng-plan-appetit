import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatabaseService } from '../services/database.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  name: string = '';
  notes: string = '';
  directions: string = '';
  ingredients: string = '';
  categories: string = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.name);
    this.recipeService
      .addRecipe(
        this.name,
        undefined,
        this.notes,
        this.directions,
        this.ingredients.split('\n'),
        this.categories.split('\n')
      )
      .then((recipe) => {
        // This could be done with form.reset()
        this.name = '';
        this.notes = '';
        this.directions = '';
        this.ingredients = '';
        this.categories = '';
      });

  }
}
