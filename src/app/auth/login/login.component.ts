import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggedInUserId } from 'src/app/core/interfaces/loggedInUserId';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from '../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  loginUser(user : User) {    
    this.userService.loginUser(user).subscribe(
      (response: any) => {
        if (response?.user) {
          sessionStorage.setItem('loggedInUserId', JSON.stringify(response));
          this.loggedInUserId = JSON.parse(sessionStorage.getItem('loggedInUserId') || '{}');
          this.router.navigate(["/liste"])
            .then(() => {
              this.toastr.success("Vous êtes connecté", "Connexion réussie", {
                positionClass: "toast-bottom-center" 
              });
            });
        }
      },
      (error: HttpErrorResponse) => {
        this.toastr.error("Mauvais email ou mot de passe !", "Erreur de connexion", {
            positionClass: "toast-bottom-center" 
        });
      }
    );
  };

}
