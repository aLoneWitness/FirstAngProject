import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../_models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
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
  public modal?: NzModalRef;
  public formGroup: FormGroup;

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

  openEditProfileModal(tplContent: TemplateRef<{}>): void {
    this.modal = this.modalService.create({
      nzTitle: 'Edit User Profile',
      nzContent: tplContent,
      nzClosable: false,
    });
  }

  submitForm(value: any): void {
    console.log(this.formGroup.valid);
  }
}
