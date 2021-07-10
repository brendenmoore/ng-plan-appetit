import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-prepappetit';

  constructor(private auth: AuthService){}

  loginTest() {
    this.auth.login("brendenm17+test@gmail.com", "password");
  }
}
