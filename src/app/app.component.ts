import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(public auth: AngularFireAuth, public userService: UserService) {
  }


}
