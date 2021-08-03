import { Component, OnInit } from '@angular/core';
import { DatabaseService} from '../services/database.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  name: string = "";

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.name)
    this.recipeService.addRecipe(this.name).then(recipe => this.name = "");
  }

}
