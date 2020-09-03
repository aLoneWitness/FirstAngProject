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
    // TODO: Implement HTTPParams?

    return this.http.get<any>(`/users?offset=` + offset + '&limit=' + limit).pipe(map(responseData => {
      const userList: Array<User> = new Array<User>();
      responseData.data.forEach(userObject => {
        const user = new User();
        user.firstName = userObject.firstName;
        user.lastName = userObject.lastName;
        user.avatar = userObject.avatar;
        user.email = userObject.email;
        userList.push(user);
      });

      return userList;
    }));
  }
}
