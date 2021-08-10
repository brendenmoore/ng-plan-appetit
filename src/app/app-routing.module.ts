import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DragDropComponent } from './template-builder/drag-drop/drag-drop.component';


const routes: Routes = [
  {path: "", component: AppComponent},
  {path: "template", component: DragDropComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
