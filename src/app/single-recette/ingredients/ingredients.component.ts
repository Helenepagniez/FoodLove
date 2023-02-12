import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Composant } from 'src/app/models/composant.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recette } from 'src/app/models/recette.model';
import { RecetteService } from 'src/app/services/recette.services';

export interface Unite {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

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

  constructor(private recetteService: RecetteService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private fb: FormBuilder, 
              private router: Router) {}

  ngOnInit(){
    this.updateform= this.fb.group({
      _id: [''],
      nomIngredient: ['', [Validators.required]],
      quantiteValue: ['', [Validators.required]],
      unite: ['', [Validators.required]]
    });
    this.getOneRecette(this.route.snapshot.params['id']);
    
  }

  modify(composant: Composant) {
    this.composant=composant;
  }

  unmodify() {
    this.composant = null;
  }

  onClickRecette(id: string) {
    this.router.navigate(['recette/', id]);
  }

  getOneRecette(recetteId: string) {
    this.recetteService.getOneRecette(recetteId).subscribe(
      (response: Recette) => {
        this.recette= response;
        this.composants=response.composants;
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
        this.snackBar.open("ingrédient modifié", "Fermer", {duration: 1000}).afterDismissed().subscribe(() => {
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
      "ingredientId":"",
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

}
