import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MenuComponent } from './menu/menu.component';
import { RecipeListPageComponent } from './recipes/recipe-list-page/recipe-list-page.component';
import { RecipePageComponent } from './recipes/recipe-page/recipe-page.component';
import { DragDropComponent } from './template-builder/drag-drop/drag-drop.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { RecipeService } from './services/recipe.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomeComponent } from './home/home.component';

const redirectUnauthorizedToLogin = () => redirectLoggedInTo(['login']);
const redirectLoggedInToRecipes = () => redirectLoggedInTo(['recipes']);
const redirectLoggedInToLogout = () => redirectLoggedInTo(['logout']);

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent, },
  {path: "recipes", component: RecipeListPageComponent, canActivate: [AngularFireAuthGuard]},
  {path: "recipe/:id", component: RecipePageComponent},
  {path: "template", component: DragDropComponent},
  {path: "menu", component: MenuComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
