import { Component, OnInit } from '@angular/core';
import { Meal, MenuDay, Recipe } from '../models';
import { MenuService } from '../services/menu.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  meal?: Meal;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getMenuDaysInRange(new Date(), 1).valueChanges().subscribe(menus => {this.meal = menus[0].meal})
  }
}
