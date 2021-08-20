import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe, RecipeDetails } from 'src/app/models';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css'],
})
export class RecipePageComponent implements OnInit {
  recipe$?: Observable<Recipe | undefined>
  recipeDetails$?: Observable<RecipeDetails | undefined>

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      this.loadData(id);
    });
  }

  ngOnInit(): void {}

  loadData(id: string) {
    this.recipe$ = this.recipeService
      .getRecipeById(id)
      .valueChanges({ idField: 'id' });
    this.recipeDetails$ = this.recipeService
      .getRecipeDetails(id)
      .valueChanges();
  }

  goBack(){
  }
}
