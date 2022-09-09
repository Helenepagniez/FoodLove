import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  recette!: Recette;
  imagePreview!: string;
  file!: File | null;
  ingredients!: Ingredient[];
  etapes!: Etape[];
  uniteList: string[] = ['litre', 'décilitre', 'grammes', 'centilitres', 'cuillères', 'produit'];
  filtreList: string[] =  ['Familiale', 'Rapide', 'Entrée', 'Repas', 'Dessert'];
  filtres = new FormControl('');

  constructor( private recetteService: RecetteService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
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
  updateRecette(recetteId: number, recette: Recette) {
    this.recetteService.updateRecette(recetteId, recette).subscribe(
      (response: Recette) => {
        this.snackBar.open("Message modifié", "Fermer", {duration: 2000});
        this.isModifying = false;
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
            location.reload();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
  };



}
