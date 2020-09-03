import { Injectable } from '@angular/core';
import {User} from '../_models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userListSubject: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>(new Array<User>());
  private totalUserAmountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor(private http: HttpClient) {
  }

  public getTotalUserAmount(): Observable<number> {
    // Todo: Get total amount of users here
    return this.http.get<any>(`/users`).pipe(map(data => data.total));
  }

  public getUserList(offset: number, limit: number): Observable<Array<User>> {
    const ourParams = new HttpParams();
    ourParams.set('offset', String(offset));
    ourParams.set('limit', String(limit));

    return this.http.get<any>(`/users`, {params: ourParams}).pipe();
  }
}
