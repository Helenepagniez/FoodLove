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
  selector: 'app-form-essai',
  templateUrl: './form-essai.component.html',
  styleUrls: ['./form-essai.component.css']
})
export class FormEssaiComponent implements OnInit {

  isModifying: boolean = false;
  updateform!: FormGroup;
  updateEtape!: FormGroup;
  updateFiltres!: FormGroup;
  recette!: Recette;
  imagePreview!: string;
  file!: File | null;
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
    this.updateEtape= this.fb.group({
      nomEtape: ['', [Validators.required]],
      nouvelleEtape: ['', [Validators.required]]
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

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.file=file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  } 

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
    /*
    nouvelleRecette.ingredients= [{
      "_id":null,
      "nomIngredient":"Saumon",
      "quantiteValue":2,
      "unite":"Produits"
    }];
    */
   console.log(nouvelleRecette);
   console.log(this.recette.etapes);
   console.log(this.nouvellesEtapes);

   
   
   //ajouter les nouvelles etapes aux etapes de la nouvelle recette (attention modifications des anciennes à garder)
  /*
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
    */
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

  addEtape (){
    let nouvelleEtape = {
      "_id": null,
      "nomEtape": "Nouvelle étape"
    };
    
    this.nouvellesEtapes.push(nouvelleEtape);
  }
}
