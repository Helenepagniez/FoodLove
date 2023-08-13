import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { LoggedInUserId } from '../core/interfaces/loggedInUserId';
import { Recette } from '../core/interfaces/recette';
import { User } from '../core/interfaces/user';
import { RecetteService } from '../core/services/recette.service';


export interface Filtre {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-recette-list',
  templateUrl: './recette-list.component.html',
  styleUrls: ['./recette-list.component.css']
})
export class RecetteListComponent implements OnInit{
  imagePath: string = environment.imagePath;
  recettes: Recette[] = [];
  recette!: Recette;
  loggedInUser!: User | null;
  loggedInUserId!: LoggedInUserId | null;
  user!: User;
  users: User[] = [];
  selectedChip!: string;
  filteredRecettes: Recette[] = [];
  
  filtres: Filtre[] = [
    {value: 'aperitif', viewValue: 'Apéritif'},
    {value: 'cocktails', viewValue: 'Cocktails'},
    {value: 'dessert', viewValue: 'Dessert'},
    {value: 'entrée', viewValue: 'Entrée'},
    {value: 'familiale', viewValue: 'Familiale'},
    {value: 'rapide', viewValue: 'Rapide'},
    {value: 'repas', viewValue: 'Repas'},
    {value: 'annuler', viewValue: 'Annuler'}
  ];

  constructor(private router: Router,
     private recetteService: RecetteService,
     private toastr : ToastrService) { }


  ngOnInit() {
    if (sessionStorage.getItem('loggedInUserId')===null) {
      this.loggedInUserId = null;
    }
    else {
      this.loggedInUserId = JSON.parse(sessionStorage.getItem('loggedInUserId') || '{}');
    };
    this.getRecettes();
  };

  onClickRecette(id: string) {
    this.router.navigate(['recette/', id]);
  }

  //Afficher toutes les recettes
  getRecettes() {
    this.recetteService.getRecettes().subscribe({
      next: (response: Recette[]) => {
        if (response && response.length === 0) {
          this.router.navigate(['/new-recette']).then(() => {
            this.toastr.info("Ajouter une recette avant de pouvoir les consulter", "Pas de recette", {
              positionClass: "toast-bottom-center" 
            });
          });
        }
        this.recettes = response;
        for (let recette of response) {
          if (!recette.picture) {
            recette.picture = this.imagePath+ "recettes/recette_auto.png";
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      }
    })
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

  activateCategory() {
    if (!this.selectedChip) {
      this.filteredRecettes = this.recettes;
    }
    else {
      this.filteredRecettes = [];
      for (const recette of this.recettes) {
        if (recette?.filtres.includes(this.selectedChip)) {
          this.filteredRecettes.push(recette);
        }
      }
    }
  }

  fakeArray(length: number): Array<any> {
    return new Array(length);
  }

}

