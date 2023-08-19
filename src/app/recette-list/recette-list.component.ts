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
    {value: 'entree', viewValue: 'Entrée'},
    {value: 'plat', viewValue: 'Plat'},
    {value: 'dessert', viewValue: 'Dessert'},
    {value: 'boissons', viewValue: 'Boissons'},
    {value: 'sauces', viewValue: 'Sauces'},
    {value: 'familiale', viewValue: 'Familiale'},
    {value: 'rapide', viewValue: 'Rapide'}
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
        this.filteredRecettes = this.recettes;
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
    let withFilterCondition: boolean = false;
    let noFilterCondition: boolean = false;
    if (!this.selectedChip) {
      this.filteredRecettes = [];
      for (const recette of this.recettes) {
        noFilterCondition = recette.menu?.toLowerCase().indexOf(key.toLowerCase())!== -1;
        if (noFilterCondition) {
          this.filteredRecettes.push(recette);
        }
      }
      if (this.filteredRecettes.length === 0 ||!key) {
        this.filteredRecettes = this.recettes;
      }
    }
    else {
      this.filteredRecettes = [];    
      let filtreSelected: string = ""; 
      for (let filtre of this.filtres) {
        if (filtre.viewValue === this.selectedChip) {
          filtreSelected = filtre.value;
        }
      }       
      for (const recette of this.recettes) {
        withFilterCondition = (recette.menu?.toLowerCase().indexOf(key.toLowerCase())!== -1
                                            && recette.filtres.includes(filtreSelected));
        if (withFilterCondition) {
          this.filteredRecettes.push(recette);
        }
      }
      if (this.filteredRecettes.length === 0 ||!key) {
        this.activateFiltre();
      }
    }
  };

  activateFiltre() {
    if (!this.selectedChip) {
      this.filteredRecettes = this.recettes;
    }
    else {
      this.filteredRecettes = [];
      let filtreSelected: string = ""; 
      for (let filtre of this.filtres) {
        if (filtre.viewValue === this.selectedChip) {
          filtreSelected = filtre.value;
        }
      }
      for (const recette of this.recettes) {
        if (recette?.filtres.includes(filtreSelected)) {
          this.filteredRecettes.push(recette);
        }
      }
    }
  }

  fakeArray(length: number): Array<any> {
    return new Array(length);
  }

}

