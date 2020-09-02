import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userBatch: Array<User> = new Array<User>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  // public switchPage(pageNumber): void {
  //   this.userService;
  //   // return;
  // }
}
