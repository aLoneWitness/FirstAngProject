import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<Observable<User>> {
  constructor(private userService: UserService) {
  }

  // tslint:disable-next-line:max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<User>> | Promise<Observable<User>> | Observable<User> {
    return this.userService.getUserByID(Number(route.paramMap.get('id')));
  }
}
