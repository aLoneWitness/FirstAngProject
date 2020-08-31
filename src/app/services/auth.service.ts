import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): object {
    return this.http.post<any>(`/auth/login`, { username, password })
      .pipe(map(data => {
        localStorage.setItem('userToken', JSON.stringify(data.token));
        return data;
      }) );
  }

  logout(): void {
    localStorage.removeItem('userToken');
  }
}
