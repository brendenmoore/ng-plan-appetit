import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from './auth-data.model';
import {Apollo, gql} from 'apollo-angular';

const BACKEND_URL = environment.apiURL + "user/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private authStatusListener = new Subject<boolean>();
  private isLoggedIn: boolean = false;
  // private tokenTimer: NodeJS.Timer = new NodeJS.Timeout()
  private userId: string | null = '';
  private userEmail: string | null = '';

  constructor(private http: HttpClient, private router: Router, private apollo: Apollo) { }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getUserEmail() {
    (this.userEmail);
    return this.userEmail;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  createUserOLD(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post(BACKEND_URL + "signup", authData).subscribe(
      result => {
        this.login(email, password);
    }, error => {
      this.authStatusListener.next(false);
    })
  }

  private CREATE_USER = gql`
    mutation register($email: String, $password: String) {
      createUser(data: {
        name: "Test",
        email: $email,
        password: $password
      }){
        name
        id
      }
    }
  `

  createUser(email: string, password: string) {
    this.apollo.mutate({
      mutation: this.CREATE_USER,
      variables: {
        email,
        password
      }
    }).subscribe(
      result => {
        console.log("user created")
        this.login(email, password);
    }, error => {
      this.authStatusListener.next(false);
    })
  }

  private LOGIN_USER = gql`
    mutation login {
      authenticateUserWithPassword(email: "brendenm17+test@gmail.com", password: "password"){
        token
        item{
          name
          id
          email
        }
      }
    }
  `

  login(email: string, password: string) {
    this.apollo.mutate<{authenticateUserWithPassword: {token: string, item: {name: string, id: string, email: string}}}>({
      mutation: this.LOGIN_USER
    }).subscribe(
      result => {
        if (result.data){
          console.log(result)
          const {authenticateUserWithPassword} = result.data;
          const {token} = authenticateUserWithPassword;
          this.token = token;
          if (token) {
            console.log("User logged in")
            this.isLoggedIn = true;
            this.userId = authenticateUserWithPassword.item.id;
            this.userEmail = authenticateUserWithPassword.item.email;
            this.authStatusListener.next(true);
          }
        }
      }
    )
  }

  loginOLD(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string, userEmail: string}>(BACKEND_URL + "login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isLoggedIn = true;
          this.userId = response.userId;
          this.userEmail = response.userEmail;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + (expiresInDuration * 1000));
          this.saveAuthData(token, expirationDate, this.userId, this.userEmail);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      })
  }

  logout() {
    this.token = null;
    this.isLoggedIn = false;
    this.userId = null;
    this.authStatusListener.next(false);
    // clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isLoggedIn = true;
      this.userId = authInformation.userId;
      this.userEmail = authInformation.userEmail;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userEmail: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
  }

  private setAuthTimer(duration: number) {
  //   this.tokenTimer = setTimeout(() => {
  //     this.logout();
  //   }, duration * 1000)
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userEmail: userEmail
    }
  }
}
