import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  uniteList: string[] = ['litre', 'décilitre', 'grammes', 'centilitres', 'cuillères', 'produit', 'kilogrammes'];
  filtreList: string[] =  ['Familiale', 'Rapide', 'Entrée', 'Repas', 'Dessert'];
  recette!: Recette;
  recetteId!: Recette['_id'];
  unite!: string;
  filtres = new FormControl('');

  constructor(private fb: FormBuilder,
    private recetteService: RecetteService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.recetteForm = this.fb.group({
      menu: [''],
      portions: [''],
      temps: [''],
      filtres: ['', [Validators.required]],
      picture: ['']
    });
  }

    //Ajouter une recette
    addRecette(recette: Recette) {
      recette.picture=this.imagePreview;
      let newRecette: Recette = {
        "_id":null,
        "menu":recette.menu,
        "portions":recette.portions,
        "temps":recette.temps,
        "picture":recette.picture,
        "etapes":[],
        "filtres":recette.filtres,
        "ingredients":[]
      };
      
      this.recetteService.addRecette(newRecette).subscribe(
        (response: Recette) => {
          this.snackBar.open("Recette enregistrée", "Fermer", {duration: 2000}).afterDismissed().subscribe(() => {
            location.href="/liste";
        });
        },
        (error: HttpErrorResponse) => {
          if(error.status !== 400){
            alert(error.message);
          }
          else if(error.status === 400){
            this.snackBar.open("Recette enregistrée", "Fermer", {duration: 2000}).afterDismissed().subscribe(() => {
              location.href="/liste";
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
