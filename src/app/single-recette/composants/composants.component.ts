import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Composant } from 'src/app/core/interfaces/composant';
import { Recette } from 'src/app/core/interfaces/recette';
import { RecetteService } from 'src/app/core/services/recette.service';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { Ingredient } from 'src/app/core/interfaces/ingredient';

export interface Unite {
  value: string;
  viewValue: string;
}

export interface Categorie {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-composants',
  templateUrl: './composants.component.html',
  styleUrls: ['./composants.component.css']
})
export class ComposantsComponent implements OnInit {

  ingredients: Ingredient[]= [];
  composant!: Composant | null;
  composants: Composant[] = [];
  updateform!: FormGroup;
  recette!: Recette;

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

  categories: Categorie[] = [
    {value: 'assaisonnements', viewValue: 'Assaisonnements'},
    {value: 'feculents', viewValue: 'Féculents'},
    {value: 'fruits', viewValue: 'Fruits'},
    {value: 'legumes', viewValue: 'Légumes'},
    {value: 'produits-laitiers', viewValue: 'Produits Laitiers'},
    {value: 'proteines', viewValue: 'Protéines'},
    {value: 'autres', viewValue: 'Autres'},
    {value: 'personnaliser', viewValue: 'Personnaliser'},
    {value: 'nouveau', viewValue: 'Nouveau'}
  ];

  constructor(private recetteService: RecetteService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private fb: FormBuilder, 
              private router: Router,
              private ingredientService: IngredientService) {}

  ngOnInit(){
    this.updateform= this.fb.group({
      _id: [''],
      nomIngredient: ['', [Validators.required]],
      quantiteValue: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      unite: ['', [Validators.required]]
    });
    this.getOneRecette(this.route.snapshot.params['id']);
    this.getIngredients();
  }

  disableCategorie(categorie: Categorie): boolean {
    return categorie.value === 'nouveau';
  }

  modify(composant: Composant) {
    this.composant=composant;
    this.getIngredients();
    setTimeout(() => {
      this.ingredients = this.ingredients.filter((ingredient) => ingredient.categorie === composant.ingredient?.categorie);
    }, 100);
  }

  unmodify() {
    this.composant = null;
    this.getIngredients();
  }

  onCategorieChange(event: any) {
    this.composant!.ingredient!.categorie = event;
    this.modify(this.composant!);
  }

  onClickRecette(id: string) {
    this.router.navigate(['recette/', id]);
  }

  getOneRecette(recetteId: string) {
      this.recetteService.getOneRecette(recetteId).subscribe(
      (response: Recette) => {
        this.recette= response;
        this.composants=response.composants;
        for (let composant of this.composants) {
          composant.ingredient = {_id:null, nomIngredient: "", categorie:"", picture: ""};
          this.ingredientService.getOneIngredient(composant.ingredientId).subscribe(
            (response: Ingredient) => {
              composant.ingredient = response;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };

  //modifier les composants
  updateComposant(composant: Composant) {
    composant.quantiteValue = composant.quantiteValue/this.recette.portions!;
    this.recetteService.updateComposant(composant, this.recette._id).subscribe(
      (response: Composant) => {
        this.snackBar.open("Composant modifié", "Fermer", {duration: 1000}).afterDismissed().subscribe(() => {
          location.reload();
      });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

  //créer un composant
  addComposant() {
    let nouveauComposant: Composant= {
      "_id":null,
      "ingredient":null,
      "ingredientId":"63e9167ced2f749f999d1002",
      "quantiteValue":0,
      "unite":"produit"
    };
    this.recetteService.addComposant(nouveauComposant, this.recette._id).subscribe(
      (response: Composant) => {
        this.snackBar.open("Composant ajouté", "Fermer", {duration: 2000});
        this.getOneRecette(this.recette._id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

  //supprimer un composant
  deleteComposant(composant: Composant, recetteId: number) {
    const dialogRef = this.dialog.open(DialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.recetteService.deleteComposant(composant, recetteId).subscribe(
          (response: Composant) => {
            this.snackBar.open("Composant supprimé", "Fermer", {duration: 1000}).afterDismissed().subscribe(() => {
              location.reload();
            });
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
  };

  getIngredients(){
    this.ingredientService.getIngredients().subscribe(
      (response: Ingredient[]) => {
        this.ingredients = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
