import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoggedInUserId } from '../core/interfaces/loggedInUserId';
import { User } from '../core/interfaces/user';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser!: User | null;
  loggedInUserId!: LoggedInUserId | null;
  users: User[]=[];
  user!: User;

  constructor(private userService: UserService,
              private toastr : ToastrService,
              private router : Router) { }

  ngOnInit() {
    let btn : any = document.querySelector("#btn");
    let sidebar: any = document.querySelector(".sidebar");
  
      btn.onclick = function () {
        sidebar.classList.toggle("active");
      }
  }

   //déconnecter l'utilisateur connecté
   logoutUser() {
    this.userService.logoutUser(this.loggedInUser!).subscribe({
      next: (response: User) => {
        sessionStorage.removeItem('loggedInUserId');
        this.loggedInUser = null;
        this.loggedInUserId = null;
        this.router.navigate(["/home"])
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      },
      complete: () => {
        this.toastr.success("Vous êtes déconnecté", "Déconnexion réussie", {
          positionClass: "toast-bottom-center" 
        });
      }
   });
  };

}
