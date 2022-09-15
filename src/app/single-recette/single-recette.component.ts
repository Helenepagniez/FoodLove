import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { Etape } from '../models/etape.model';
import { Ingredient } from '../models/ingredient.model';
import { Recette } from '../models/recette.model';
import { RecetteService } from '../services/recette.services';

@Component({
  selector: 'app-single-recette',
  templateUrl: './single-recette.component.html',
  styleUrls: ['./single-recette.component.css']
})
export class SingleRecetteComponent implements OnInit {
  
  isModifying: boolean = false;
  updateform!: FormGroup;
  updateFiltres!: FormGroup;
  recette!: Recette;
  ingredients!: Ingredient[];
  etapes!: Etape[];
  uniteList: string[] = ['litre', 'décilitre', 'grammes', 'centilitres', 'cuillères', 'produit'];
  filtreList: string[] =  ['Familiale', 'Rapide', 'Entrée', 'Repas', 'Dessert'];
  filtres = new FormControl('');
  nouvellesEtapes: Etape[] = [];

  constructor( private recetteService: RecetteService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.updateform= this.fb.group({
      menu: ['', [Validators.required]],
      temps: ['', [Validators.required]],
      filtres: ['', [Validators.required]]
    });
    this.getOneRecette(this.route.snapshot.params['id']);
  }

  getOneRecette(recetteId: string) {
    this.recetteService.getOneRecette(recetteId).subscribe(
      (response: Recette) => {
        this.recette= response;
        this.etapes=response.etapes;
        this.ingredients=response.ingredients;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };

  onModify() {
    if (this.isModifying) {
      this.isModifying = false;
    }
    else {
      this.isModifying = true;
    }
  }

  //modifier les recettes
  updateRecette(nouvelleRecette: Recette) {
    console.log(nouvelleRecette);
    nouvelleRecette.etapes= this.recette.etapes;
    nouvelleRecette.portions= this.recette.portions;
    nouvelleRecette.ingredients= this.recette.ingredients;
    nouvelleRecette.picture= this.recette.picture;
    nouvelleRecette.video= this.recette.video;

    this.recetteService.updateRecette(this.recette._id, nouvelleRecette).subscribe(
      (response: Recette) => {
        this.snackBar.open("Message modifié", "Fermer", {duration: 2000});
        this.isModifying = false;
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

  //supprimer les recettes
  deleteRecette(recetteId: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.recetteService.deleteRecette(recetteId).subscribe(
          (response: void) => {
            location.href="/liste";
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
  }
}
