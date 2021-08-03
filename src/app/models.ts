import { AngularFirestoreDocument } from "@angular/fire/firestore";

export interface Recipe {
  id?: string;
  name: string;
  createdOn: Date;
}

export interface Meal {
  id?: string;
  name: string;
  createdOn: Date;
  recipes: Array<{recipeId: string, order: number, name?: string}>
}



