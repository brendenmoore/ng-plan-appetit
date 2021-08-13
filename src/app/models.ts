export interface Recipe {
  id?: string;
  name: string;
  createdOn: number;
}

// export class Recipe {
//   id?: string;
//   name: string;
//   createdOn: Date;
//   constructor(name: string){
//     this.name = name;
//     this.createdOn = new Date();
//   }
//   toDTO(): RecipeDTO {
//     return {name: this.name, createdOn: this.createdOn}
//   }
// }

export interface RecipeDetails {
  id: string;
  notes: string;
  directions: string;
  ingredients: string[];
}

// export class RecipeDetails {
//   id: string;
//   notes: string;
//   directions: string;
//   ingredients: string[];

//   constructor(id: string, notes: string = "", directions: string = "", ingredients: string[] = []) {
//     this.id = id;
//     this.notes = notes;
//     this.directions = directions;
//     this.ingredients = ingredients;
//   }

//   toDTO(): RecipeDetailsDTO {
//     return {id: this.id, notes: this.notes, directions: this.directions, ingredients: this.ingredients}
//   }
// }

export interface Meal {
  id: string;
  createdOn: number;
  recipes: Array<Recipe>;
}

// export class Meal {
//   id: string;
//   createdOn: Date;
//   recipes: Array<Recipe>;

//   constructor(recipes: Recipe[] = []) {
//     this.id = generateUid();
//     this.createdOn = new Date();
//     this.recipes = recipes;
//   }

//   toDTO(): MealDTO {
//     return {id: this.id, createdOn: this.createdOn, recipes: this.recipes.map(recipe => recipe.toDTO())}
//   }
// }

export interface Template {
  scheduledMeals: Meal[];
  unscheduledMeals: Meal[];
}

// export class Template {
//   scheduledMeals: Meal[] =[];
//   unscheduledMeals: Meal[] = [];

//   constructor(templateDTO: TemplateDTO) {
//     this.scheduledMeals
//   }

//   toDTO(): TemplateDTO {
//     return {scheduledMeals: this.scheduledMeals.map(meal => meal.toDTO()), unscheduledMeals: this.unscheduledMeals.map(meal => meal.toDTO())}
//   }
// }

export interface MenuDay {
  dateString: string;
  dateNumber: number;
  meal: Meal;
}

export interface Menu {
  menuDays: MenuDay[]
}

export interface ListItem {
  id?: string;
  name: string;
  checked: boolean;
}

export interface ShoppingList {
  items: ListItem[];
  recipes: Recipe[];
}




