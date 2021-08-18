import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { isNamedTupleMember } from 'typescript';
import { Meal, MenuDay, Recipe, Template } from '../models';
import { MealService } from '../services/meal.service';
import { MenuService } from '../services/menu.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  daysInView: Date[];
  menuDays: MenuDay[] | undefined;
  template: Template | undefined;
  menu: { date: Date; menuDay: MenuDay }[] = [];
  recipes: Recipe[] = [];

  constructor(
    private menuService: MenuService,
    private mealService: MealService,
    private recipeService: RecipeService
  ) {
     this.recipeService
       .getRecipeList()
       ?.valueChanges({ idField: 'id' })
       .subscribe((recipes) => {
         this.recipes = recipes;
       });
    this.daysInView = this.menuService.getCurrentWeek();
    const firstDay = this.daysInView[0];
    const numberOfDays = this.daysInView.length;
    this.menuService
      .getMenuDaysInRange(firstDay, numberOfDays)
      .valueChanges()
      .subscribe((menuDays) => {
        this.menuDays = menuDays;
        this.loadMenu();
      });
    this.mealService.getTemplate().subscribe((template) => {
      this.template = template;
      console.log(template);
    });
  }

  ngOnInit(): void {}

  onAccept(day: Date, meal: Meal) {
    this.menuService.addMenuDay(day, meal);
  }

  loadMenu() {
    if (this.menuDays) {
      this.menu = this.menuService.loadMenu(this.daysInView, this.menuDays);
      this.menuDays = this.menu.map(item => item.menuDay)
    }
    console.log(this.menu);
  }

  addRecipe(recipe: Recipe, menuDay: MenuDay){
    menuDay.meal.recipes.push(recipe)
    this.menuService.setMenuDay(menuDay)
  }

  removeRecipe(recipeToRemove: Recipe, menuDay: MenuDay) {
    menuDay.meal.recipes = menuDay.meal.recipes.filter(recipe => recipe.id !== recipeToRemove.id);
    this.menuService.setMenuDay(menuDay);
  }

  drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.recipes,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data.recipes,
        event.container.data.recipes,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.menu);
    console.log(this.menuDays);
    this.menuService.updateMultipleDays(this.menu.map(item => item.menuDay))
  }
}
