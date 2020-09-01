import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {catchError, first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  email = new FormControl();
  password = new FormControl();
  lastLoginFailed = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.password.setValidators([Validators.minLength(8), Validators.required]);
    this.email.setValidators([Validators.email, Validators.required]);
  }

  ngOnInit(): void {
  }

  login(e): void {
    e.preventDefault();
    if (this.email.valid && this.password.valid){
      this.authenticationService.login(this.email.value, this.password.value)
        .pipe(first(), catchError(err => {
          if (err.status && err.status === 401) {
            this.lastLoginFailed = true;
            return throwError(err);
          }
        }))
        .subscribe(data => {
          this.router.navigate(['home']);
        }
      );
    }

    // this.authenticationService.login(, this.password);
  }
}
