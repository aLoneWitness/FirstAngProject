import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpsInterceptor} from './_interceptors/https.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {en_GB, NZ_I18N} from 'ng-zorro-antd/i18n';
import { nl_NL } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import nl from '@angular/common/locales/nl';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './routing.module';
import {AuthInterceptor} from './_interceptors/auth.interceptor';
import {ErrorInterceptor} from './_interceptors/error.interceptor';
import {
  NzAvatarModule,
  NzBadgeModule,
  NzButtonModule,
  NzCheckboxModule, NzDescriptionsModule,
  NzDividerModule,
  NzDropDownModule,
  NzFormModule,
  NzIconModule, NzInputModule, NzModalModule, NzModalService,
  NzPageHeaderModule, NzPopconfirmModule, NzTableModule
} from 'ng-zorro-antd';
import { ProfileComponent } from './profile/profile.component';

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
    NzCheckboxModule,
    NzFormModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzDividerModule,
    NzTableModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzAvatarModule,
    NzPopconfirmModule,
    NzModalModule,
    NzInputModule
  ],
  providers: [
    // AppComponent,
    { provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: NZ_I18N, useValue: en_GB },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
