import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipePageComponent } from './recipes/recipe-page/recipe-page.component';
import { DragDropComponent } from './template-builder/drag-drop/drag-drop.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';


const routes: Routes = [
  {path: "", component: AppComponent},
  {path: "recipes", component: RecipeListComponent},
  {path: "recipe/:id", component: RecipePageComponent},
  {path: "template", component: DragDropComponent},
  {path: "menu", component: MenuComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
