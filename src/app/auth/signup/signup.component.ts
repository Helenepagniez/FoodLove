import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoggedInUserId } from 'src/app/core/interfaces/loggedInUserId';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  user!: User;
  users: User[]=[];
  loggedInUser!: User | null;
  loggedInUserId!: LoggedInUserId | null;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      firstname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
    if (sessionStorage.getItem('loggedInUserId')===null) {
      this.loggedInUserId = null;
    }
    else {
      this.loggedInUserId = JSON.parse(sessionStorage.getItem('loggedInUserId') || '{}');
    }
  }

  addUser(user : User) {
    user.role="CLIENT";
    user.picture=null;
    this.userService.addUser(user).subscribe(
      (response: User) => {
        location.href="/login";
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };


}
