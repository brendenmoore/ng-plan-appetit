import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddRecipeComponent } from 'src/app/add-recipe/add-recipe.component';
import { Recipe } from 'src/app/models';

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

  constructor(public dialog: MatDialog) {}

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
    if (event.option.value === 'new') {
      this.dialog.open(AddRecipeComponent)
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
