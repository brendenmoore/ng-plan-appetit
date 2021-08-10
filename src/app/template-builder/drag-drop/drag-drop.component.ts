import { Component } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Recipe } from 'src/app/models';
import { Observable } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';

class Meal {
  id: string;
  recipes: Recipe[]

  constructor() {
    this.id = Date.now().toString();
    this.recipes = [];
  }
}

interface Template {
  meals: Meal[]
}

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css'],
})
export class DragDropComponent {
  recipes?: Recipe[];
  sampleMeal: Meal = { id: 'testMealId', recipes: [] };
  template: Template = {meals: []}

  constructor(private recipeService: RecipeService) {
    recipeService
      .getRecipeList()
      ?.valueChanges({ idField: 'id' })
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  addDay() {
    this.template.meals.push(new Meal())
  }

  noReturnPredicate() {
    return false;
  }

  drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.recipes,
        event.previousIndex,
        event.currentIndex
      );
    } else if(event.previousContainer.data instanceof Meal) {
      transferArrayItem(
        event.previousContainer.data.recipes,
        event.container.data.recipes,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data.recipes,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
