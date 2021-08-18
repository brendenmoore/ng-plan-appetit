import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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



@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
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
    NgbModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    DragDropModule,
    MatDialogModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
