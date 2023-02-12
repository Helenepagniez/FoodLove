import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
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
  filtreList: string[] =  ['Familiale', 'Rapide', 'Entrée', 'Repas', 'Dessert'];
  recette!: Recette;
  filtres = new FormControl('');

  constructor(private fb: FormBuilder,
    private recetteService: RecetteService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.recetteForm = this.fb.group({
      menu: [''],
      portions: [''],
      temps: [''],
      etoile: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])],
      filtres: ['', [Validators.required]],
      picture: ['']
    });
  }

    //Ajouter une recette
    addRecette(recette: Recette) {
      recette.picture=this.imagePreview;
      let newRecette: Recette = {
        "_id":null,
        "posterId":recette.posterId,
        "menu":recette.menu,
        "portions":recette.portions,
        "etoile":recette.etoile,
        "temps":recette.temps,
        "picture":recette.picture,
        "etapes":[],
        "filtres":recette.filtres,
        "composants": recette.composants
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
