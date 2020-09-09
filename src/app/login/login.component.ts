import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  lastLoginFailed = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [localStorage.getItem('rememberedEmail'), [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      rememberMe: [true]
    });
  }

  submitForm(e): void {
    e.preventDefault();
    if (this.validateForm.valid){
      this.authenticationService.login(this.validateForm.controls.email.value, this.validateForm.controls.password.value)
        .pipe(first(), catchError(err => {
          if (err.status && err.status === 401) {
            this.lastLoginFailed = true;
            return throwError(err);
          }
        }))
        .subscribe(data => {
          console.log('LOGIN SUCCESS');
          if (this.validateForm.controls.rememberMe.value === true){
            localStorage.setItem('rememberedEmail', this.validateForm.controls.email.value);
          }
          else {
            localStorage.removeItem('rememberedEmail');
          }
          this.router.navigate(['']).catch(err => console.log('Unable to route', err));
        }
      );
    }
  }
}
