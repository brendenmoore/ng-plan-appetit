export class Recipe {
  id?: string;
  name: string;
  createdOn: Date;
  constructor(name: string){
    this.name = name;
    this.createdOn = new Date();
  }
  toObject(): {name: string, createdOn: Date}{
    return {name: this.name, createdOn: this.createdOn}
  }
}

export class RecipeDetails {
  id: string;
  notes: string;
  directions: string;
  ingredients: string[];

  constructor(id: string, notes: string = "", directions: string = "", ingredients: string[] = []) {
    this.id = id;
    this.notes = notes;
    this.directions = directions;
    this.ingredients = ingredients;
  }

  toObject(): {id: string, notes?: string, directions?: string, ingredients?: string[]} {
    return {id: this.id, notes: this.notes, directions: this.directions, ingredients: this.ingredients}
  }
}

export class Meal {
  id?: string;
  createdOn: Date;
  recipes: Array<Recipe>;

  constructor(recipes: Recipe[] = []) {
    this.createdOn = new Date();
    this.recipes = recipes;
  }
}

export interface Template {
  scheduledMeals: Meal[],
  unscheduledMeals: Meal[]
}

export class MenuDay {
  date: Date;
  meal: Meal;

  constructor (date: Date, meal: Meal) {
    this.date = date;
    this.meal = meal;
  }
}
export interface Menu {
  menuDays: MenuDay[]
}

export class ListItem {
  id?: string;
  name: string;
  checked: boolean;

  constructor(name: string) {
    this.name = name;
    this.checked = false;
  }
}

export interface ShoppingList {
  items: ListItem[];
  recipes: Recipe[];
}




