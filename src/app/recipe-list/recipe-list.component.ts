import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, Recipe } from '../database.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList$?: Observable<Recipe[]>;

  constructor(private db: DatabaseService) {
    this.recipeList$ = this.db.getRecipeList()?.valueChanges();
   }

  ngOnInit(): void {
  }

}
