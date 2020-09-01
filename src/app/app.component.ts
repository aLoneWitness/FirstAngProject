import { Component } from '@angular/core';
import {AuthenticationService} from './_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService: AuthenticationService, private router: Router) {
  }
  title = 'FirstAngProject';

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
