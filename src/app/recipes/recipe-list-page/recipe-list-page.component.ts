import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { Recipe } from 'src/app/models';
import { RecipeService } from 'src/app/services/recipe.service';

class CategoryFilter {
  name: string;
  selected: boolean = false;
  constructor(name: string) {
    this.name = name;
  }
}

@Component({
  selector: 'app-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrls: ['./recipe-list-page.component.css']
})
export class RecipeListPageComponent implements OnInit {
  recipes: Recipe[] = [];
  recipeView?: Recipe = undefined;
  newRecipe: boolean = false;
  filteredRecipes?: Observable<Recipe[]>;
  testCategories = ["Meals", "Sides", "Desserts", "Baking", "Veggies", "Baby Food", "Poop"].map(name => new CategoryFilter(name))
  selectedCategories: string[] = [];
  categories: string[];
  selectedCategory: string | undefined;
  filterInput = new FormControl();

  constructor(private recipeService: RecipeService, public auth: AngularFireAuth) {
    this.categories = recipeService.getCategories();
  }

  ngOnInit(): void {
    this.recipeService.getRecipeList()?.valueChanges({"idField": "id"}).subscribe(recipes => {
      this.recipes = recipes
      this.filterRecipes()
    })
  }

  filterRecipes() {
    this.filteredRecipes = this.filterInput.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.recipes.slice()))
    );
  }

  private _filter(value: string): Recipe[] {
    const filterValue = value.toLowerCase();

    return this.recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(filterValue)
    );
  }

  hideRecipe(){
    this.recipeView = undefined;
  }

  showRecipe(recipe: Recipe){
    this.recipeView = recipe;
  }

  showForm(){
    this.newRecipe = true;
  }

  hideForm(){
    this.newRecipe = false;
  }
}
