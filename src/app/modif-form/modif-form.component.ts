import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Etape } from '../models/etape.model';
import { Ingredient } from '../models/ingredient.model';
import { Recette } from '../models/recette.model';
import { RecetteService } from '../services/recette.services';

@Component({
  selector: 'app-modif-form',
  templateUrl: './modif-form.component.html',
  styleUrls: ['./modif-form.component.css']
})
export class ModifFormComponent implements OnInit {

  recetteForm!: FormGroup;
  imagePreview!: string;
  file!: File | null;
  uniteList: string[] = ['litre', 'décilitre', 'grammes', 'centilitres', 'cuillères', 'produit'];
  filtreList: string[] =  ['Familiale', 'Rapide', 'Entrée', 'Repas', 'Dessert'];
  recettes!: Recette[];
  recette!: Recette;
  recetteId!: Recette['_id'];
  unite!: string;
  filtres = new FormControl('');

  constructor(private formBuilder: FormBuilder,
    private recetteService: RecetteService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.recetteForm = this.formBuilder.group({
      menu: [''],
      picture: [''],
      nomEtape: [''],
      quantiteValue: [''],
      nomIngredient: [''],
      portions: [''],
      temps: [''],
      filtreList: ['']
    });
  }
  
  //Modifier une recette
  updateRecette(recette: Recette) {
    let newRecette: Recette = {
      "_id": this.recette._id,
      "menu":this.recetteForm.get('menu')?.value,
      "portions":this.recetteForm.get('portions')?.value,
      "temps":this.recetteForm.get('temps')?.value,
      "picture":this.recetteForm.get('picture')?.value,
      "video":this.recetteForm.get('video')?.value,
      "etapes":[],
      "filtres":[],
      "ingredients":[]
    };
  
    if (this.recetteForm.get('nomEtape')?.value) {
      let etape: Etape = {
        "_id": null,
        "nomEtape":this.recetteForm.get('nomEtape')?.value,
      };
      newRecette.etapes.push(etape);
    }
    if (this.recetteForm.get('nomIngredient')?.value) {
      let ingredient: Ingredient = {
        "_id": null,
        "nomIngredient":this.recetteForm.get('nomIngredient')?.value,
        "quantiteValue":this.recetteForm.get('quantiteValue')?.value,
        "unite":this.unite
      };
      newRecette.ingredients.push(ingredient);
    }
    console.log(newRecette);

    this.recetteService.updateRecette(recette?._id, recette).subscribe(
      (response: Recette) => {
        this.snackBar.open("Recette modifiée", "Fermer", {duration: 2000}).afterDismissed().subscribe(() => {
          location.href="/recette/:id";
        });
      },
      (error: HttpErrorResponse) => {
        if(error.status !== 400){
          alert(error.message);
        }
        else if(error.status === 400){
          this.snackBar.open("Recette modifiée", "Fermer", {duration: 2000}).afterDismissed().subscribe(() => {
            location.href="/recette/:id";
          });
        }
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

}
