import { Meal, Recipe } from "../models";

export function generateUid(): string {
  return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
}

export function newMeal(recipes?: Recipe[]): Meal {
  return {
    id: generateUid(),
    createdOn: Date.now(),
    recipes: recipes || [],
  };
}
