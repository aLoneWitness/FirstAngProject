import {Injectable} from '@angular/core';
import {HttpsInterceptor} from './https.interceptor';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../_services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpsInterceptor {
  constructor(private authenticationService: AuthenticationService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('userToken');
    let newRequest = req;

    // CODE MAGIC KEEP HERE
    if (!!jwt) {
       newRequest = req.clone({
        setHeaders: {
          Authorization: jwt
        }
      });
    }


    return next.handle(newRequest);
  }

}
