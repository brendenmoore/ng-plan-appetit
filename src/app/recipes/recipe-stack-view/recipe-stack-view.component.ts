import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe, RecipeDetails } from 'src/app/models';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-stack-view',
  templateUrl: './recipe-stack-view.component.html',
  styleUrls: ['./recipe-stack-view.component.css'],
})
export class RecipeStackViewComponent implements OnInit {
  recipe?: Recipe;
  recipeId?: string;
  recipeDetails$?: Observable<RecipeDetails | undefined>

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.recipeId = params.id;
      this.recipeService.getRecipeById(params.id).valueChanges().subscribe(recipe => {
        if (recipe) {
          this.recipe = recipe
          this.loadData(recipe);
        }
      })
    })
  }

  ngOnInit(): void {
  }

  loadData(recipe: Recipe) {
    this.recipeDetails$ = this.recipeService
      .getRecipeDetails(recipe.id)
      .valueChanges();
  }
}
