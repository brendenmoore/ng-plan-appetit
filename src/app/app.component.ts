import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-prepappetit';
  email: string | null = '';
  authListener: Subscription;
  isLoggedIn: boolean = false;
  dataLoading: boolean = true;
  userData: {id: string, name:string, recipes: {name: string, id: string}[]} | null = null;

  constructor(private auth: AuthService, private recipe: RecipeService){
    this.authListener = auth.getAuthStatusListener().subscribe(status => {this.isLoggedIn = status;
    this.email = this.auth.getUserEmail()})
    this.recipe.getUserData().valueChanges.subscribe(({data, loading}) => {
      this.dataLoading = loading;
      const {authenticatedUser} = data
      this.userData = authenticatedUser;
      if(this.userData){

        console.log(this.userData.name)
      }
    })
  }

  loginTest() {
    this.auth.login("brendenm17+test@gmail.com", "password");
    this.userData = this.recipe.getUserData().getCurrentResult().data
  }

}
