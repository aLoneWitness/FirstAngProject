import { Component } from '@angular/core';
import {AuthenticationService} from './_services/auth.service';
import {Router} from '@angular/router';
import {User} from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public currentUser: User;
  public isAuthenticated: boolean;

  constructor(public authService: AuthenticationService, private router: Router) {
    this.currentUser = new User();
    authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });

    authService.isAuthenticated.subscribe(data => {
      this.isAuthenticated = data;
    });
  }
  title = 'FirstAngProject';

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  public goToMyProfile(): void {
    this.router.navigate(['profile', { id: this.currentUser.id }]);
  }
}
