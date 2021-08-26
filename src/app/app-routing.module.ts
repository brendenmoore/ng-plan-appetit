import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MenuComponent } from './menu/menu.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeListPageComponent } from './recipes/recipe-list-page/recipe-list-page.component';
import { RecipePageComponent } from './recipes/recipe-page/recipe-page.component';
import { DragDropComponent } from './template-builder/drag-drop/drag-drop.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';


const routes: Routes = [
  {path: "", component: RecipeListPageComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {path: "recipes", component: RecipeListPageComponent},
  {path: "recipe/:id", component: RecipePageComponent},
  {path: "template", component: DragDropComponent},
  {path: "menu", component: MenuComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
