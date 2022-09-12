import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoggedInUserId } from '../models/loggedInUserId.model';
import { Recette } from '../models/recette.model';
import { User } from '../models/user.model';
import { RecetteService } from '../services/recette.services';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-recette-list',
  templateUrl: './recette-list.component.html',
  styleUrls: ['./recette-list.component.css']
})
export class RecetteListComponent implements OnInit{
  recettes: Recette[] = [];
  recette!: Recette;
  loggedInUser!: User | null;
  loggedInUserId!: LoggedInUserId | null;
  user!: User;
  users: User[] = [];
  filtres: string[] = ['Familiale','Rapide','Entrée','Repas','Dessert','Annuler'];

  constructor(private router: Router,
     private recetteService: RecetteService,
     private userService: UserService,
     private snackBar: MatSnackBar,
     private dialog: MatDialog) { }


  ngOnInit() {
    if (localStorage.getItem('loggedInUserId')===null) {
      this.loggedInUserId = null;
    }
    else {
      this.loggedInUserId = JSON.parse(localStorage.getItem('loggedInUserId') || '{}');
    };
    this.getRecettes();
  };

  onClickRecette(id: string) {
    this.router.navigate(['recette/', id]);
  }

  //Afficher toutes les recettes
  getRecettes() {
    this.recetteService.getRecettes().subscribe(
      (response: Recette[]) => {
        this.recettes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };

  //Barre de recherche des recettes
  searchRecettes(key: string){
    const results: Recette[] = [];
    for (const recette of this.recettes) {
      if (recette.menu?.toLowerCase().indexOf(key.toLowerCase())!== -1) {
        results.push(recette);
      }
    }
    this.recettes = results;
    if (results.length === 0 ||!key) {
      this.getRecettes();
    }
  };

  activateFiltre(filtre: string) {
    const results: Recette[] = [];
    for (let recette of this.recettes) {
      if(recette.filtres.includes(filtre)) {
          results.push(recette);
        }
    }
    if (results.length !== 0) {
      this.recettes = results;
    }
    else {
      this.getRecettes();
    }
  }

}

