import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggedInUserId } from 'src/app/core/interfaces/loggedInUserId';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  user!: User;
  loggedInUser!: User | null;
  loggedInUserId!: LoggedInUserId | null;
  loginSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private router : Router) { }

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

  ngOnDestroy() {
    this.loginSubscription && this.loginSubscription.unsubscribe();
  }

  loginUser(user : User) { 
    if (this.loginForm.valid) {
      this.loginSubscription = this.userService.loginUser(user).subscribe({
        next: (response: any) => {
          if (response?.user) {
            sessionStorage.setItem('loggedInUserId', JSON.stringify(response));
            this.loggedInUserId = JSON.parse(sessionStorage.getItem('loggedInUserId') || '{}');
            this.router.navigate(["/liste"])
          }
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error("Mauvais email ou mot de passe !", "Erreur de connexion", {
              positionClass: "toast-bottom-center" 
          })
        },
        complete: () => {
          this.toastr.success("Vous êtes connecté", "Connexion réussie", {
            positionClass: "toast-bottom-center" 
          })
        }
      })
    }
    else {
      this.toastr.error("Formulaire invalide !", "Erreur de connexion", {
        positionClass: "toast-bottom-center" 
      })
    }
  }

}
