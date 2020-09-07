import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  public isModalVisible = false;
  public isFormLoading = false;
  public formGroup: FormGroup;

  constructor(private userService: UserService, private route: Router, private fb: FormBuilder) {
    this.pageSize = 8;
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
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

  routeToProfile(id): void {
    this.route.navigate(['profile', { id } ]);
  }

  submitForm(e?: Event): void {
    if (!this.formGroup.valid) { return; }
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.isFormLoading = true;
    const newUser: User = new User();
    newUser.firstName = this.formGroup.controls.firstName.value;
    newUser.lastName = this.formGroup.controls.lastName.value;
    newUser.email = this.formGroup.controls.email.value;
    newUser.password = this.formGroup.controls.password.value;

    this.userService.createUser(newUser).subscribe(user => {
      this.isFormLoading = false;
      this.isModalVisible = false;
      this.route.navigate(['profile', { id: user.id }]);
    });
  }

  onFormCancel(): void {
    this.isModalVisible = false;
  }

  openCreateProfileModal(): void {
    this.isModalVisible = true;
  }
}
