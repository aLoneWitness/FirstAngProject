import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Todo: Un-hardcode the URL
    const baseUrl = 'https://skill.jarpiscloud.nl/api/v1';
    req = req.clone({
      url: baseUrl + req.url
    });
    return next.handle(req);
  }
}
