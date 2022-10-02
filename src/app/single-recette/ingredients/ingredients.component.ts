import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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

  ingredient!: Ingredient | null;
  ingredients: Ingredient[] = [];
  updateform!: FormGroup;
  recette!: Recette;

  unites: Unite[] = [
    {value: 'litre', viewValue: 'Litre'},
    {value: 'décilitre', viewValue: 'Décilitre'},
    {value: 'gramme', viewValue: 'Gramme'},
    {value: 'centilitre', viewValue: 'Centilitre'},
    {value: 'cuillère', viewValue: 'Cuillère'},
    {value: 'produit', viewValue: 'Produit'},
    {value: 'kilogramme', viewValue: 'Kilogramme'}
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

  modify(ingredient: Ingredient) {
    this.ingredient=ingredient;
  }

  unmodify() {
    this.ingredient = null;
  }

  onClickRecette(id: string) {
    this.router.navigate(['recette/', id]);
  }

  getOneRecette(recetteId: string) {
    this.recetteService.getOneRecette(recetteId).subscribe(
      (response: Recette) => {
        this.recette= response;
        this.ingredients=response.ingredients;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };

  //modifier les ingrédients
  updateIngredient(ingredient: Ingredient) {
    this.recetteService.updateIngredient(ingredient, this.recette._id).subscribe(
      (response: Ingredient) => {
        this.snackBar.open("ingrédient modifié", "Fermer", {duration: 1000}).afterDismissed().subscribe(() => {
          location.reload();
      });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

  //créer un ingrédient
  addIngredient() {
    let nouvelIngredient: any= {
      "nomIngredient":"nouvel ingrédient",
      "quantiteValue":1,
      "unite":"produit"
    };
    this.recetteService.addIngredient(nouvelIngredient, this.recette._id).subscribe(
      (response: Ingredient) => {
        this.snackBar.open("ingrédient ajouté", "Fermer", {duration: 2000});
        this.getOneRecette(this.recette._id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

}
