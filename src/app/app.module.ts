import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpsInterceptor} from './_interceptors/https.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { nl_NL } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import nl from '@angular/common/locales/nl';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './routing.module';
import {AuthInterceptor} from './_interceptors/auth.interceptor';
import {ErrorInterceptor} from './_interceptors/error.interceptor';
import {NzPageHeaderModule} from 'ng-zorro-antd';
import { ProfileComponent } from './profile/profile.component';
import {AuthGuardService} from './_services/auth-guard.service';
import {JWT_OPTIONS, JwtHelperService, JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';
import {AuthenticationService} from './_services/auth.service';

registerLocaleData(nl);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzPageHeaderModule,
  ],
  providers: [
    // AppComponent,
    { provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: NZ_I18N, useValue: nl_NL },
    [AuthenticationService],
    [AuthGuardService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
