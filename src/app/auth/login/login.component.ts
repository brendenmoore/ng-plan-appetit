import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode = 'unknown';

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    // this.mode = this.getPWADisplayMode()
  }

  fakeLogin(){
      this.userService.loginWithPassword("brendenm17+test@gmail.com", "testtestyay");
  }

  getPWADisplayMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (document.referrer.startsWith('android-app://')) {
      return 'twa';
    } else if ((navigator as any).standalone || isStandalone) {
      return 'standalone';
    }
    return 'browser';
  }

}
