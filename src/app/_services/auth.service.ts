import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../_models/user';

@Injectable({ providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userToken')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`/auth/login`, { email, password })
      .pipe(map(data => {
        localStorage.setItem('userToken', JSON.stringify(data.token));
        this.currentUserSubject.next(data);
        return data;
      }) );
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null);
  }
}
