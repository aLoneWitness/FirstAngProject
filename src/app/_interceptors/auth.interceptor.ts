import {Injectable} from '@angular/core';
import {HttpsInterceptor} from './https.interceptor';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../_services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpsInterceptor {
  private jwt: string;

  constructor(private authenticationService: AuthenticationService) {
    authenticationService.currentUserToken.subscribe(newToken => {
      this.jwt = newToken;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest = req;

    if (!!this.jwt) {
      newRequest = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.jwt
        }
      });
    }


    return next.handle(newRequest);
  }

}
