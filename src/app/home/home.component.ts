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
  public totalUserAmount: number;
  public pageSize: number;
  public currentPage: number;
  public loading = true;

  constructor(private userService: UserService) {
    this.pageSize = 6;
  }

  ngOnInit(): void {
    this.userService.getTotalUserAmount().subscribe(result => {
      this.totalUserAmount = result;
    });

    this.onPageChange(1);
    this.currentPage = 1;
  }

  onPageChange(e): void {
    console.log(e);
    this.userService.getUserList(e * this.pageSize - this.pageSize, this.pageSize).subscribe(users => {
      this.userBatch = users;
      this.loading = false;
    });
  }
}
