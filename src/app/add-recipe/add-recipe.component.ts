import { Component, OnInit } from '@angular/core';
import { DatabaseService, Recipe } from '../database.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  name: string = "";

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.name)
    this.db.addRecipe({name: this.name}).then(recipe => this.name = "");
  }

}
