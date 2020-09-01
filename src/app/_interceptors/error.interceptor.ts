import {Injectable} from '@angular/core';
import {HttpsInterceptor} from './https.interceptor';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../_services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpsInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      console.log(error);
      if (error.status === 401) {
        this.authenticationService.logout();
      }

      return throwError(error);
    }));
  }
}
