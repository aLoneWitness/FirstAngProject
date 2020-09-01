import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../_models/user';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userToken')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string): any {
    return this.http.post<any>(`/auth/login`, { email, password })
      .pipe(map(data => {
        console.log('MAPPING');
        localStorage.setItem('userToken', JSON.stringify(data.token));
        this.currentUserSubject.next(data);
        return data;
      }) );
  }

  public logout(): void {
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');

    return !this.jwtHelper.isTokenExpired(token);
  }
}
