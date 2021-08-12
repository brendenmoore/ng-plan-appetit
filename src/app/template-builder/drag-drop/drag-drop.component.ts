import { Component } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Meal, Recipe, Template } from 'src/app/models';
import { Observable } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css'],
})
export class DragDropComponent {
  recipes?: Recipe[];
  template?: Template;

  constructor(private recipeService: RecipeService, private mealService: MealService) {
    this.loadTemplate();
    this.recipeService
      .getRecipeList()
      ?.valueChanges({ idField: 'id' })
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  loadTemplate() {
    this.mealService.getTemplate().subscribe(template => {
      if (!template) {
        this.template = {scheduledMeals: [], unscheduledMeals: []};
        this.mealService.createTemplate(this.template);
      } else {
        this.template = template;
      }
    })
  }

  updateTemplate() {
    if (this.template){
      this.mealService.updateTemplate(this.template)
    }
  }

  addDay() {
    this.template?.scheduledMeals.push(new Meal())
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
    console.log(this.template)
    this.updateTemplate();
  }
}
