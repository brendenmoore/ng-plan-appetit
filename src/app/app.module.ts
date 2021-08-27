import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMealComponent } from './add-meal/add-meal.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropComponent } from './template-builder/drag-drop/drag-drop.component';
import { DeleteBtnComponent } from './shared/delete-btn/delete-btn.component';
import { StepperComponent } from './stepper/stepper.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuComponent } from './menu/menu.component';
import { RecipeSelectorComponent } from './shared/recipe-selector/recipe-selector.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { TodayViewComponent } from './today-view/today-view.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { StackViewComponent } from './shared/stack-view/stack-view.component';
import { RecipePageComponent } from './recipes/recipe-page/recipe-page.component';
import { RecipeStackViewComponent } from './recipes/recipe-stack-view/recipe-stack-view.component';
import { TabLayoutComponent } from './shared/tab-layout/tab-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RecipeListPageComponent } from './recipes/recipe-list-page/recipe-list-page.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import { TodayComponent } from './today/today.component';


@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    AddMealComponent,
    MealListComponent,
    DragDropComponent,
    DeleteBtnComponent,
    StepperComponent,
    ViewRecipeComponent,
    MenuComponent,
    RecipeSelectorComponent,
    TodayViewComponent,
    NavbarComponent,
    StackViewComponent,
    RecipePageComponent,
    RecipeStackViewComponent,
    TabLayoutComponent,
    LoginComponent,
    RecipeListPageComponent,
    LogoutComponent,
    HomeComponent,
    TodayComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    DragDropModule,
    MatDialogModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
