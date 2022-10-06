import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoggedInUserId } from '../models/loggedInUserId.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.services';

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

  constructor(private userService: UserService) { }

  ngOnInit() {
    let btn : any = document.querySelector("#btn");
    let sidebar: any = document.querySelector(".sidebar");
  
      btn.onclick = function () {
        sidebar.classList.toggle("active");
      }
  }

   //déconnecter l'utilisateur connecté
   logoutUser() {
    this.userService.logoutUser(this.loggedInUser!).subscribe(
      (response: User) => {
        sessionStorage.removeItem('loggedInUserId');
        this.loggedInUser = null;
        this.loggedInUserId = null;
        location.href="/home";
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

}
