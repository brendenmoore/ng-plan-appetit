import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { DragDropComponent } from './template-builder/drag-drop/drag-drop.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';


const routes: Routes = [
  {path: "", component: AppComponent},
  {path: "recipes", component: RecipeListComponent},
  {path: "recipe/:id", component: ViewRecipeComponent},
  {path: "template", component: DragDropComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
