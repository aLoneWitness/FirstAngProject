import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {NzModalRef, NzModalService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User = new User();
  public formGroup: FormGroup;
  public isFormLoading = false;
  public isModalVisible = false;

  constructor(private route: Router, private activatedRoute: ActivatedRoute,
              private userService: UserService, private modalService: NzModalService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      avatar: [this.user.avatar, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    let userId: number;
    this.activatedRoute.paramMap.subscribe(params => {
      userId = +params.get('id');
    });

    this.userService.getUserByID(userId).subscribe(userData => {
      this.user = userData;

      this.formGroup.controls.avatar.setValue(this.user.avatar);
      this.formGroup.controls.email.setValue(this.user.email);
      this.formGroup.controls.firstName.setValue(this.user.firstName);
      this.formGroup.controls.lastName.setValue(this.user.lastName);
      this.formGroup.controls.password.setValue(this.user.password);
    });
  }

  deleteUser(): void {
    this.userService.deleteUserByID(this.user.id).subscribe(isSuccesfull => {
      if (isSuccesfull) {
        this.route.navigate(['']);
      }
      else {
        window.alert('Something went wrong');
      }
    });
  }

  openEditProfileModal(): void {
    this.isModalVisible = true;
  }

  submitForm(e?: Event): void {
    if (!this.formGroup.valid) { return; }
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.isFormLoading = true;
    const newUser: User = new User();
    newUser.id = this.user.id;
    newUser.firstName = this.formGroup.controls.firstName.value;
    newUser.lastName = this.formGroup.controls.lastName.value;
    newUser.email = this.formGroup.controls.email.value;
    newUser.password = this.formGroup.controls.password.value;
    newUser.avatar = this.formGroup.controls.avatar.value;

    this.userService.updateUserByID(newUser).subscribe(user => {
      this.user = user;
      this.isFormLoading = false;
      this.isModalVisible = false;
    });
  }

  onFormCancel(): void {
    this.isModalVisible = false;
  }
}
