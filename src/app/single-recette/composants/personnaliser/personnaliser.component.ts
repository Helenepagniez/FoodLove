import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/core/interfaces/ingredient';
import { Recette } from 'src/app/core/interfaces/recette';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Categorie } from '../composants.component';

@Component({
  selector: 'app-personnaliser',
  templateUrl: './personnaliser.component.html',
  styleUrls: ['./personnaliser.component.css']
})
export class PersonnaliserComponent implements OnInit {
  ingredients: Ingredient[]= [];
  ingredient!: Ingredient | null;
  recette!: Recette;
  updateform!: FormGroup;

  categories: Categorie[] = [
    {value: 'assaisonnements', viewValue: 'Assaisonnements'},
    {value: 'feculents', viewValue: 'Féculents'},
    {value: 'fruits', viewValue: 'Fruits'},
    {value: 'legumes', viewValue: 'Légumes'},
    {value: 'produits-laitiers', viewValue: 'Produits Laitiers'},
    {value: 'proteines', viewValue: 'Protéines'},
    {value: 'autres', viewValue: 'Autres'}
  ];

  constructor(private router: Router,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private ingredientService: IngredientService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.updateform= this.fb.group({
      _id: [''],
      categorie: ['', [Validators.required]],
      nomIngredient: ['', [Validators.required]]
    });
    this.getIngredients();
  }

  onClickIngredient() {
    this.router.navigate([`recette/${this.route.snapshot.params['id']}/ingredients`]);
  }

  modify(ingredient: Ingredient) {
    this.ingredient=ingredient;
    document.getElementById("cancel")?.scrollIntoView({behavior:"smooth"});
  }

  unmodify() {
    this.ingredient = null;
  }

  onCategorieChange(event: any) {
    this.ingredient!.categorie = event;
  }

  getIngredients(){
    this.ingredientService.getIngredients().subscribe({
      next: (response: Ingredient[]) => {
        this.ingredients = response.filter(ingredient => ingredient.posterId);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      }
    })
  }

   //créer un ingrédient
   addIngredient() {
    let nouvelIngredientPersonnaliser: any= {
      nomIngredient: "nouvel ingrédient personnalisé",
      categorie: "autres"
    };
    this.ingredientService.addIngredient(nouvelIngredientPersonnaliser).subscribe({
      next: (response: Ingredient) => {
        this.toastr.success("Ingrédient ajouté", "Ajout Ingrédient réussi", {
          positionClass: "toast-bottom-center" 
        });
        this.getIngredients();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      }
     });
  };

  //modifier les ingrédients
  updateIngredient(ingredient: Ingredient) {
    this.ingredientService.updateIngredient(ingredient, this.ingredient!._id).subscribe({
      next: (response: Ingredient) => {
        this.unmodify();
        this.toastr.success("Ingrédient modifié", "Modification Ingrédient réussi", {
          positionClass: "toast-bottom-center" 
        });
        this.getIngredients();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      }
    });
  };

  //supprimer les ingrédients
  deleteIngredient(ingredientId: string) {
    const dialogRef = this.dialog.open(DialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.ingredientService.deleteIngredient(ingredientId).subscribe({
          next: (response: any) => {
            this.toastr.success("Ingrédient supprimé", "Suppression Ingrédient réussi", {
              positionClass: "toast-bottom-center" 
            });
            this.getIngredients();
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error(error.message, "Erreur serveur", {
              positionClass: "toast-bottom-center" 
            });
          }
        });
      }
    });
  };


}
