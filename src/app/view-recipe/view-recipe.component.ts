import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe, RecipeDetails } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  recipe$?: Observable<Recipe | undefined>;
  recipeDetails$?: Observable<RecipeDetails | undefined>;

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      console.log(id)
      this.recipe$ = this.recipeService.getRecipeById(id).valueChanges({idField: "id"})
      this.recipeDetails$ = this.recipeService.getRecipeDetails(id).valueChanges();
    })
  }

}
