import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Etape } from '../models/etape.model';
import { Ingredient } from '../models/ingredient.model';
import { Recette } from '../models/recette.model';
import { RecetteService } from '../services/recette.services';

@Component({
  selector: 'app-recette-form',
  templateUrl: './recette-form.component.html',
  styleUrls: ['./recette-form.component.css']
})
export class RecetteFormComponent implements OnInit {

  recetteForm!: FormGroup;
  imagePreview!: string;
  file!: File | null;
  uniteList: string[] = ['litre', 'décilitre', 'grammes', 'centilitres', 'cuillères', 'produit'];
  filtreList: string[] =  ['Familiale', 'Rapide', 'Entrée', 'Repas', 'Dessert'];
  recettes!: Recette[];
  recette!: Recette;
  recetteId!: Recette['_id'];
  unites = new FormControl('');
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
      uniteList: [''],
      nomIngredient: [''],
      portions: [''],
      temps: [''],
      filtreList: ['']
    });
  }

    /**
    creer une recette a partir du formulaire et envoie au backend
    submitRecette() {
      const recette = new Recette();
      recette._id=this.recette?._id!;
      recette.picture=this.imagePreview;
      recette.menu=this.recetteForm.get('menu')!.value;
      recette.etapes=this.recetteForm.get('etapes')!.value;
      recette.quantites=this.recetteForm.get('quantites')!.value;
      recette.unites=this.recetteForm.get('unites')!.value;
      recette.ingredients=this.recetteForm.get('ingredients')!.value;
      recette.portions=this.recetteForm.get('portions')!.value;
      recette.temps=this.recetteForm.get('temps')!.value;
      recette.filtres=this.recetteForm.get('filtres')!.value;
      this.addRecette(recette);
    }
    */
    //Ajouter une recette
    addRecette(recette: Recette) {
      let etape: Etape = {
        "_id": 1,
        "nomEtape":this.recetteForm.get('nomEtape')!.value,
      };
      recette.etapes.push(etape);
      
      let ingredient: Ingredient = {
        "_id": 1,
        "nomIngredient":this.recetteForm.get('nomIngredient')!.value,
        "quantiteValue":this.recetteForm.get('quantiteValue')!.value,
        "unite":this.recetteForm.get('unite')!.value
      };
      recette.ingredients.push(ingredient);
      
      this.recetteService.addRecette(recette).subscribe(
        (response: Recette) => {
          this.snackBar.open("Recette enregistrée", "Fermer", {duration: 2000}).afterDismissed().subscribe(() => {
            location.reload();
        });
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
}
