import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggedInUserId } from 'src/app/models/loggedInUserId.model';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user!: User;
  loggedInUser!: User | null;
  loggedInUserId!: LoggedInUserId | null;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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

  loginUser(user : User) {    
    this.userService.loginUser(user).subscribe(
      (response: any) => {
        if (response?.user) {
          sessionStorage.setItem('loggedInUserId', JSON.stringify(response));
          this.loggedInUserId = JSON.parse(sessionStorage.getItem('loggedInUserId') || '{}');
          location.href="/liste";
        }
        else {
          alert("Mauvais mot de passe ou email");
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

}
