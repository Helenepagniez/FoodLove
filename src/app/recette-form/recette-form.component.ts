import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recette } from '../core/interfaces/recette';
import { RecetteService } from '../core/services/recette.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Filtre } from '../single-recette/single-recette.component';

@Component({
  selector: 'app-recette-form',
  templateUrl: './recette-form.component.html',
  styleUrls: ['./recette-form.component.css']
})
export class RecetteFormComponent implements OnInit, OnDestroy {

  recetteForm!: FormGroup;
  imagePreview!: string;
  file!: File | null;
  filtreList: Filtre[] = [
    {value: 'entree', viewValue: 'Entrée'},
    {value: 'plat', viewValue: 'Plat'},
    {value: 'dessert', viewValue: 'Dessert'},
    {value: 'boissons', viewValue: 'Boissons'},
    {value: 'sauces', viewValue: 'Sauces'},
    {value: 'familiale', viewValue: 'Familiale'},
    {value: 'rapide', viewValue: 'Rapide'}
  ];
  recette!: Recette;
  filtres = new FormControl('');
  ajoutRecetteSubscription!: Subscription;

  constructor(private fb: FormBuilder,
              private toastr : ToastrService,
              private recetteService: RecetteService,
              private router : Router) { }

  ngOnInit() {
    this.recetteForm = this.fb.group({
      menu: [''],
      portions: [''],
      temps: [''],
      etoile: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])],
      filtres: [[]],
      picture: ['']
    })
  }

  ngOnDestroy() {
    this.ajoutRecetteSubscription && this.ajoutRecetteSubscription.unsubscribe();
  }

    //Ajouter une recette
    addRecette(recette: Recette) {
      if (this.recetteForm.valid) {
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
        this.ajoutRecetteSubscription = this.recetteService.addRecette(newRecette).subscribe({
          next: (response: Recette) => {
            this.router.navigate(["/liste"])
          },
          error: (error: HttpErrorResponse) => {
            if(error.status !== 400){
              this.toastr.error(error.message, "Erreur serveur", {
                positionClass: "toast-bottom-center" 
              })
            }
            else if(error.status === 400){
              this.router.navigate(["/liste"])
              .then(() => {
                this.toastr.success("Recette enregistrée", "Ajout réussie", {
                  positionClass: "toast-bottom-center" 
                })
              }
            )}
          },
          complete: () => {
            this.toastr.success("Recette enregistrée", "Ajout réussie", {
              positionClass: "toast-bottom-center" 
            })
          }
        })
      }
      else {
        this.toastr.error("Formulaire invalide !", "Erreur d'ajout de recette", {
          positionClass: "toast-bottom-center" 
        })
      }
    }
  
    onFileAdded(event: Event) {
      const file = (event.target as HTMLInputElement).files![0];
      this.file=file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } 

    updateSelectedFilters(event: any) {
      const selectedFilters = this.recetteForm.get('filtres') as FormControl;
      selectedFilters.setValue(event.checked);
    }
}
