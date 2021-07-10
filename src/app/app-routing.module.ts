import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
// import { LoginComponent } from './auth/login/login.component';
// import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {path: "", component: AppComponent},
  // {path: "dashboard", component: HomeComponent, canActivate: [AuthGuard]},
  // {path: "write", component: WriteComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  // {path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
