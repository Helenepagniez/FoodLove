import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggedInUserId } from 'src/app/core/interfaces/loggedInUserId';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm!: FormGroup;
  user!: User;
  users: User[]=[];
  loggedInUser!: User | null;
  loggedInUserId!: LoggedInUserId | null;
  addUserSubscription!: Subscription;

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

  ngOnDestroy() {
    this.addUserSubscription && this.addUserSubscription.unsubscribe();
  }

  addUser(user : User) {
    if (this.signupForm.valid) {
      user.role="CLIENT";
      user.picture=null;
      this.addUserSubscription = this.userService.addUser(user).subscribe({
        next: (response: User) => {
          this.router.navigate(["/login"])
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, "Erreur serveur", {
            positionClass: "toast-bottom-center" 
          })
        },
        complete: () =>  {
          this.toastr.success("Veuillez vous connecter", "Inscription réussie", {
            positionClass: "toast-bottom-center" 
          })
        }
      })
    }
    else {
      this.toastr.error("Formulaire invalide !", "Erreur d'inscription", {
        positionClass: "toast-bottom-center" 
      })
    }
  }


}
