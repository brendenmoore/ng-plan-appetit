import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe, RecipeDetails } from 'src/app/models';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-stack-view',
  templateUrl: './recipe-stack-view.component.html',
  styleUrls: ['./recipe-stack-view.component.css'],
})
export class RecipeStackViewComponent implements OnInit {
  @Input() recipe?: Recipe;
  recipeDetails$?: Observable<RecipeDetails | undefined>

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    if (this.recipe) {
      this.loadData(this.recipe)
    }
  }

  loadData(recipe: Recipe) {
    this.recipeDetails$ = this.recipeService
      .getRecipeDetails(recipe.id)
      .valueChanges();
  }
}
