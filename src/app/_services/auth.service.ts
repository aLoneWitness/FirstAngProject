import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {first, map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public currentUser: Observable<User>;

  private currentUserTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public currentUserToken: Observable<string>;

  private currentUserIsAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentUserIsAuthenticated: Observable<boolean>;

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    console.log('CONSTRUCTOR OF AUTH');
    this.currentUserTokenSubject.next(localStorage.getItem('userToken'));
    this.currentUserSubject.next(this.jwtHelper.decodeToken(localStorage.getItem('userToken')));
    this.currentUserIsAuthenticatedSubject.next(!this.jwtHelper.isTokenExpired(localStorage.getItem('userToken')));

    this.currentUserToken = this.currentUserTokenSubject.asObservable();
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserIsAuthenticated = this.currentUserIsAuthenticatedSubject.asObservable().pipe(tap(console.log));
  }

  // TODO: LEID DIT AF VAN ANDERE DATA EN MAAK DIT NIET EEN TOGGLEABLE BOOL
  public get isAuthenticated(): Observable<boolean> {
    return this.currentUserIsAuthenticatedSubject.asObservable().pipe(tap(isAuth => console.log('IS_AUTH', isAuth)));
  }

  public login(email: string, password: string): Observable<any> {
    this.currentUserIsAuthenticatedSubject.next(true);

    return this.http.post<any>(`/auth/login`, { email, password })
      .pipe(first(data => {
        localStorage.setItem('userToken', data.token);
        const tokenData = this.jwtHelper.decodeToken(data.token);
        this.currentUserSubject.next(tokenData);
        this.currentUserTokenSubject.next(data.token);
        this.currentUserIsAuthenticatedSubject.next(true);
        return data;
      }) );
  }

  public logout(): void {
    console.log('LOGOUT TRIGGERED');
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null);
    this.currentUserTokenSubject.next(null);
    this.currentUserIsAuthenticatedSubject.next(false);
  }
}
