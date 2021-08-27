import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MenuComponent } from './menu/menu.component';
import { RecipeListPageComponent } from './recipes/recipe-list-page/recipe-list-page.component';
import { RecipePageComponent } from './recipes/recipe-page/recipe-page.component';
import { DragDropComponent } from './template-builder/drag-drop/drag-drop.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { TodayComponent } from './today/today.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToRecipes = () => redirectLoggedInTo(['app/recipes']);
const redirectLoggedInToLogout = () => redirectLoggedInTo(['logout']);

const routes: Routes = [
  {path: "", component: LoginComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectLoggedInToRecipes}},
  {path: "login", component: LoginComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectLoggedInToRecipes}},
  {path: "logout", component: LogoutComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: "app", component: AppComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}, children: [
    {path: "recipes", component: RecipeListPageComponent},
    {path: "recipe/:id", component: RecipePageComponent},
    {path: "template", component: DragDropComponent},
    {path: "menu", component: MenuComponent},
    {path: "today", component: TodayComponent},
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
