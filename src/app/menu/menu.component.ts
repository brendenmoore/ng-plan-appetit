import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal, MenuDay, Template } from '../models';
import { MealService } from '../services/meal.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  daysInView: Date[];
  menuDays: MenuDay[] | undefined;
  template: Template | undefined;

  constructor(
    private menuService: MenuService,
    private mealService: MealService
  ) {
    this.daysInView = this.menuService.getCurrentWeek();
    const firstDay = this.daysInView[0]
    const numberOfDays = this.daysInView.length
    this.menuService.getMenuDaysInRange(firstDay, numberOfDays).valueChanges().subscribe(menuDays => this.menuDays = menuDays)
    this.mealService.getTemplate().subscribe(template => this.template = template);
  }

  ngOnInit(): void {}

  onAccept(day: Date, meal: Meal) {
    this.menuService.addMenuDay(day, meal);
  }

  loadMenu() {
    if (this.menuDays && this.template)
    this.menuService.loadMenu(this.daysInView, this.menuDays, this.template)
  }
}
