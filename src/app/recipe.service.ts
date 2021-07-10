import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private apollo: Apollo, private auth: AuthService) { }


  RECIPES = gql`
  query currentUser {
    authenticatedUser{
      id
      name
      recipes {
        name
        id
      }
    }
  }
  `

  getUserData(){
    return this.apollo.watchQuery<any>({
      query: this.RECIPES
    })
  }
}
