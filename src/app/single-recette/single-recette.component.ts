import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogSavedComponent } from '../dialog-sauvegarde/dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { Etape } from '../core/interfaces/etape';
import { Ingredient } from '../core/interfaces/ingredient';
import { Recette } from '../core/interfaces/recette';
import { IngredientService } from '../core/services/ingredient.service';
import { RecetteService } from '../core/services/recette.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

export interface Unite {
  value: string;
  viewValue: string;
}

export interface Filtre {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-single-recette',
  templateUrl: './single-recette.component.html',
  styleUrls: ['./single-recette.component.css']
})
export class SingleRecetteComponent implements OnInit {
  imagePath: string = environment.imagePath;
  isModifying: boolean = false;
  updateform!: FormGroup;
  updateMenu!: FormGroup;
  updateImage!: FormGroup;
  updateFiltres!: FormGroup;
  recette!: Recette;
  imagePreview!: string | null;
  file!: File | null;
  ingredients!: Ingredient[];
  etapes!: Etape[];

  unites: Unite[] = [
    {value: 'carré', viewValue: 'Carré'},
    {value: 'centilitre', viewValue: 'Centilitre'},
    {value: 'cuillère-cafe', viewValue: 'Cuillère à café'},
    {value: 'cuillère-soupe', viewValue: 'Cuillère à soupe'},
    {value: 'décilitre', viewValue: 'Décilitre'},
    {value: 'gramme', viewValue: 'Gramme'},
    {value: 'kilogramme', viewValue: 'Kilogramme'},
    {value: 'litre', viewValue: 'Litre'},
    {value: 'paquet', viewValue: 'Paquet'},
    {value: 'produit', viewValue: 'Produit'},
    {value: 'tranche', viewValue: 'Tranche'},
    {value: 'verre', viewValue: 'Verre'}
  ];

  filtres: Filtre[] = [
    {value: 'aperitif', viewValue: 'Apéritif'},
    {value: 'cocktails', viewValue: 'Cocktails'},
    {value: 'dessert', viewValue: 'Dessert'},
    {value: 'entree', viewValue: 'Entrée'},
    {value: 'familiale', viewValue: 'Familiale'},
    {value: 'rapide', viewValue: 'Rapide'},
    {value: 'repas', viewValue: 'Repas'}
  ];

  constructor( private recetteService: RecetteService,
              private ingredientService: IngredientService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private router : Router) { }

  ngOnInit() {
    this.updateform= this.fb.group({
      temps: ['', [Validators.required]],
      etoile: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])],
      filtres: ['', [Validators.required]],
      portions: ['', [Validators.required]]
    });

    this.updateMenu= this.fb.group({
      menu: ['', [Validators.required]]
    });

    this.updateImage= this.fb.group({
      picture: ['']
    });
    
    this.getOneRecette(this.route.snapshot.params['id']);
  }

  getOneRecette(recetteId: string) {
    this.recetteService.getOneRecette(recetteId).subscribe({
      next: (response: Recette) => {
        this.recette= response;
        this.etapes= response.etapes;
        if (!response.picture) {
          this.recette.picture = this.imagePath + "recettes/recette_auto.png";
        }
        else {
          this.recette.picture = response.picture;
        }
        this.recette.filtres = response.filtres;
        this.recette.portions = response.portions;
        this.recette.composants = response.composants;
        for (let composant of response.composants) {
          this.ingredientService.getOneIngredientById(composant.ingredientId).subscribe({
            next: (response: Ingredient) => {
              if (!response.picture) {
                response.picture = this.imagePath+ "ingrédients/ingredient_auto.png";
              }
              else {
                response.picture = this.imagePath+ "ingrédients/" + response.categorie +"/" + response.picture;
              }
              composant.ingredient = response;
            },
            error: (error: HttpErrorResponse) => {
              this.toastr.error(error.message, "Erreur serveur", {
                positionClass: "toast-bottom-center" 
              });
            }
          })
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      }
    })
  };

  onModify() {
    if (this.isModifying) {
      const dialogRef = this.dialog.open(DialogSavedComponent);
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.isModifying = false;
          this.imagePreview = null;
        }
        else {
          if (!this.updateform.value.filtres) {
            this.updateform.value.filtres = this.recette.filtres;
          }
          this.updateform.value.menu = this.updateMenu.value.menu;
          this.updateRecette(this.updateform.value);
        }
      });
    }
    else {
      this.isModifying = true;
    }
  };

  onReturn() {
    if (this.isModifying) {
      const dialogRef = this.dialog.open(DialogSavedComponent);
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.isModifying = false;
          this.imagePreview = null;
          window.location.href = '/liste';
        }
        else {
          if (!this.updateform.value.filtres) {
            this.updateform.value.filtres = this.recette.filtres;
          }
          this.updateform.value.menu = this.updateMenu.value.menu;
          this.updateRecette(this.updateform.value);
        }
      });
    }
    else {
      window.location.href = '/liste';
    }
  }

  //modifier les recettes
  updateRecette(nouvelleRecette: Recette) {
    
    nouvelleRecette.picture=this.imagePreview;

    if (nouvelleRecette.portions) {
      this.recette.portions = nouvelleRecette.portions;
    }
    if (nouvelleRecette.menu) {
      this.recette.menu = nouvelleRecette.menu;
    }
    if (nouvelleRecette.temps) {
      this.recette.temps = nouvelleRecette.temps;
    }
    if (nouvelleRecette.picture) {
      this.recette.picture = nouvelleRecette.picture;
    }
    if (nouvelleRecette.filtres) {
      this.recette.filtres = nouvelleRecette.filtres;
    }
    if (nouvelleRecette.etoile) {
      this.recette.etoile = nouvelleRecette.etoile;
    }
    this.recetteService.updateRecette(this.recette._id, this.recette).subscribe({
      next: (response: Recette) => {
        this.isModifying = false;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      },
      complete: () => {
        this.toastr.success("Recette modifiée", "Modification réussie", {
          positionClass: "toast-bottom-center" 
        });
      }
    });
  };

  //supprimer les recettes
  deleteRecette(recetteId: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.recetteService.deleteRecette(recetteId).subscribe({
          next: (response: void) => {
            this.router.navigate(["/liste"])
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error(error.message, "Erreur serveur", {
              positionClass: "toast-bottom-center" 
            });
          },
          complete: () => {
            this.toastr.success("Recette supprimée", "Suppression réussie", {
              positionClass: "toast-bottom-center" 
            });
          }
        });
      }
    });
  }

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.file=file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  } 

  onPortionsChange(event: Event) {
    this.recette.portions=Number((event.target as HTMLInputElement).value);
  }

  fakeArray(length: number): Array<any> {
    return new Array(length);
  }

}
