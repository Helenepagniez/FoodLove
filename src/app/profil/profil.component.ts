import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../core/interfaces/user';
import { UserService } from '../core/services/user.service';
import { MatDialog} from '@angular/material/dialog';
import { LoggedInUserId } from '../core/interfaces/loggedInUserId';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  imagePath: string = environment.imagePath;
  loggedInUser!: User | null;
  loggedInUserId!: LoggedInUserId | null;
  user!: User;
  userForm!: FormGroup;
  file!: File | null;
  imagePreview!: string|null;
  name!: User['name'];
  firstname!: User['firstname'];
  email!: User['email'];
  picture!: User['picture'];
  _id!: User['_id'];
  

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private toastr : ToastrService,
              private router : Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      _id: [''],
      firstname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      picture: [''],
      role: ['']
    });

    if (sessionStorage.getItem('loggedInUserId')===null) {
      this.loggedInUserId = null;
    }
    else {
      this.loggedInUserId = JSON.parse(sessionStorage.getItem('loggedInUserId') || '{}');
      this.getLoggedInUser(this.loggedInUserId!.user!);
    };
  };


   //récupère l'utilisateur connecté
   getLoggedInUser(userId: string) {
    this.userService.getUser(userId).subscribe(
      (response: User) => { 
        if (!response.picture) {
          response.picture = this.imagePath + "random-user.png";
        }
        this.loggedInUser = response;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      }
    ) 
  }

  submitUser() {
    const user = new User();
    user._id=this.loggedInUser?._id!;
    user.role = this.loggedInUser!.role;
    if (this.imagePreview) user.picture=this.imagePreview;
    if (this.userForm.get('firstname')!.value) user.firstname=this.userForm.get('firstname')!.value;
    if (this.userForm.get('name')!.value) user.name=this.userForm.get('name')!.value;
    if (this.userForm.get('email')!.value) user.email=this.userForm.get('email')!.value;
    this.updateUser(user);
  }

  //Modifier l'utilisateur connecté
  updateUser(user : User) {    
    this.userService.updateUser(user, user?._id).subscribe(
      (response: User) => {
        this.imagePreview=null;
        this.getLoggedInUser(response._id);
        this.toastr.success("Vous avez modifié vos informations", "Profil modifié", {
          positionClass: "toast-bottom-center" 
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      }
    );
  };

  //supprimer l'utilisateur connecté 
  deleteUser(userId: string) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.userService.deleteUser(userId).subscribe(
          (response: void) => {
            this.router.navigate(["/home"])
              .then(() => {
                this.toastr.success("Votre compte a été supprimé", "Suppression réussie", {
                  positionClass: "toast-bottom-center" 
                });
              });
            sessionStorage.removeItem('loggedInUserId');
            this.loggedInUser = null;
            this.loggedInUserId = null;
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(error.message, "Erreur serveur", {
              positionClass: "toast-bottom-center" 
            });
          }
        );
      }
    });
  };
  
  //ajout image
  onFileAdded(event: Event) {
      const file = (event.target as HTMLInputElement).files![0];
      this.file=file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }  

}
