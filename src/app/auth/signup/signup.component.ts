import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggedInUserId } from 'src/app/core/interfaces/loggedInUserId';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router) { }

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
        this.router.navigate(["/login"])
        .then(() => {
          this.toastr.success("Veuillez vous connecter", "Inscription réussie", {
            positionClass: "toast-bottom-center" 
          });
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      }
    );
  };


}
