import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddRecipeComponent } from 'src/app/add-recipe/add-recipe.component';
import { Recipe } from 'src/app/models';
import { RecipeService } from 'src/app/services/recipe.service';
import { generateUid } from 'src/app/services/util';

@Component({
  selector: 'app-recipe-selector',
  templateUrl: './recipe-selector.component.html',
  styleUrls: ['./recipe-selector.component.css'],
})
export class RecipeSelectorComponent implements OnInit {
  recipeInput = new FormControl();
  @Input('recipes') recipes: Recipe[] = [];
  filteredOptions?: Observable<Recipe[]>;
  @Output() recipeSelected: EventEmitter<Recipe> = new EventEmitter();

  constructor(public dialog: MatDialog, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.filteredOptions = this.recipeInput.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.recipes.slice()))
    );
  }

  displayFn(recipe: Recipe): string {
    return recipe && recipe.name ? recipe.name : '';
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    if (typeof event.option.value === 'string') {
      console.log(event.option.value)
      let newRecipe: Recipe = {id: generateUid(), name: event.option.value, createdOn: Date.now(), categories: []};
      this.recipeService.addRecipe(event.option.value, newRecipe.id).then(result => {
        this.recipeSelected.emit(newRecipe)
      })
    } else {
      this.recipeSelected.emit(event.option.value);
      this.recipeInput.reset('');
    }
  }

  private _filter(value: string): Recipe[] {
    const filterValue = value.toLowerCase();

    return this.recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(filterValue)
    );
  }
}
