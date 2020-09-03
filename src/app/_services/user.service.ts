import { Injectable } from '@angular/core';
import {User} from '../_models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  private static jsonToUserModel(userObject): User {
    const user = new User();
    user.firstName = userObject.firstName;
    user.lastName = userObject.lastName;
    user.avatar = userObject.avatar;
    user.email = userObject.email;
    user.id = userObject.id;
    user.createdAt = userObject.created_at;
    user.updatedAt = userObject.updated_at;
    user.password = userObject.password;
    return user;
  }

  public getUserByID(id: number): Observable<User> {
    return this.http.get<any>(`/users/` + id).pipe(map(userObject => {
      return UserService.jsonToUserModel(userObject);
    }));
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
        userList.push(UserService.jsonToUserModel(userObject));
      });

      return userList;
    }));
  }

  public deleteUserByID(id: number): Observable<boolean> {
    return this.http.delete<any>(`/users/` + id, { observe: 'response' }).pipe(map(httpResponse => {
      return httpResponse.ok;
    }));
  }
}
