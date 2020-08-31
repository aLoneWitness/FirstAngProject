import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpsInterceptor} from './interceptors/https.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    AppComponent,
    { provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
