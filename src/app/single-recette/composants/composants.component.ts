import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Composant } from 'src/app/core/interfaces/composant';
import { Recette } from 'src/app/core/interfaces/recette';
import { RecetteService } from 'src/app/core/services/recette.service';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { Ingredient } from 'src/app/core/interfaces/ingredient';
import { ComposantService } from 'src/app/core/services/composant.service';
import { ToastrService } from 'ngx-toastr';
import { unites } from 'src/app/shared/data/unites';
import { categories } from 'src/app/shared/data/categories';
import { CategorieFiltreUnite } from 'src/app/core/interfaces/categorieFiltreUnite';

@Component({
  selector: 'app-composants',
  templateUrl: './composants.component.html',
  styleUrls: ['./composants.component.css']
})
export class ComposantsComponent implements OnInit {
  ingredients: Ingredient[]= [];
  ingredientsASelectionner: Ingredient[]= [];
  composant!: Composant | null;
  composants: Composant[] = [];
  updateform!: FormGroup;
  recette!: Recette;
  unites: CategorieFiltreUnite[] = unites;
  categories: CategorieFiltreUnite[] = categories;

  constructor(private recetteService: RecetteService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private fb: FormBuilder, 
              private router: Router,
              private ingredientService: IngredientService,
              private composantService: ComposantService,
              private toastr: ToastrService) {}

  ngOnInit(){
    this.updateform= this.fb.group({
      _id: [''],
      nomIngredient: ['', [Validators.required]],
      quantiteValue: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      unite: ['', [Validators.required]]
    });
    this.getOneRecette(this.route.snapshot.params['id']);
    this.getIngredients();
  }

  modify(composant: Composant) {
    this.composant=composant;
    document.getElementById("cancel")?.scrollIntoView({behavior:"smooth"});
  }

  unmodify() {
    this.composant = null;
  }

  onCategorieChange(event: any) {
    this.composant!.ingredient!.categorie = event;
    this.ingredientsASelectionner = this.ingredients.filter((ingredient: Ingredient) => ingredient.categorie === event);
  }

  onClickRecette(id: string) {
    this.router.navigate(['recette/', id]);
  }

  onClickIngredientPersonnalise(id: string) {
    this.router.navigate([`recette/${id}/ingredients-perso`]);
  }

  getOneRecette(recetteId: string) {
      this.recetteService.getOneRecette(recetteId).subscribe({
      next: (response: Recette) => {
        this.recette= response;
        this.composants=response.composants;
        for (let composant of this.composants) {
          composant.ingredient = {_id:null, nomIngredient: "", categorie:"", picture: "", posterId: null};
          this.ingredientService.getOneIngredientById(composant.ingredientId).subscribe({
            next: (response: Ingredient) => {
              composant.ingredient = response;
            },
            error: (error: HttpErrorResponse) => {
              this.toastr.error(error.message, "Erreur serveur", {
                positionClass: "toast-bottom-center" 
              });
            }
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      }
      })
  };

  //modifier les composants
  updateComposant(formElements: any) {
    formElements.quantiteValue = formElements.quantiteValue/this.recette.portions!;
    let updatedComposant: Composant;
    this.ingredientService.getOneIngredientByName(formElements.nomIngredient).subscribe({
        next: (response: Ingredient) => {
          updatedComposant = {
            _id: formElements._id,
            ingredientId: response._id,
            quantiteValue: formElements.quantiteValue,
            unite: formElements.unite,
            ingredient: null
          };
          this.composantService.updateComposant(updatedComposant, this.recette._id).subscribe({
            next: (response: Composant) => {
              this.unmodify();
              this.getOneRecette(this.recette._id);
            },
            error: (error: HttpErrorResponse) => {
                this.toastr.error(error.message, "Erreur serveur", {
                  positionClass: "toast-bottom-center" 
                });
            },
            complete: () => {
              this.toastr.success("Composant modifié", "Modification Composant réussi", {
                positionClass: "toast-bottom-center" 
              });
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message, "Erreur serveur", {
            positionClass: "toast-bottom-center" 
          });
        }
      });
  }

  //créer un composant
  addComposant() {
    let nouveauComposant: Composant= {
      "_id":null,
      "ingredient":null,
      "ingredientId":"63e9167ced2f749f999d1002",
      "quantiteValue":0,
      "unite":"produit"
    };
    this.composantService.addComposant(nouveauComposant, this.recette._id).subscribe({
      next: (response: Composant) => {
        this.getOneRecette(this.recette._id);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      },
      complete: () => {
        this.toastr.success("Composant ajouté", "Ajout Composant réussi", {
          positionClass: "toast-bottom-center" 
        });
      }
    });
  };

  //supprimer un composant
  deleteComposant(composant: Composant, recetteId: number) {
    const dialogRef = this.dialog.open(DialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.composantService.deleteComposant(composant, recetteId).subscribe({
          next: (response: Composant) => {
            this.getOneRecette(this.recette._id);
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error(error.message, "Erreur serveur", {
              positionClass: "toast-bottom-center" 
            });
          },
          complete: () => {
            this.toastr.success("Composant supprimé", "Suppression Composant réussi", {
              positionClass: "toast-bottom-center" 
            });
          }
        });
      }
    });
  };

  getIngredients(){
    this.ingredientService.getIngredients().subscribe({
      next: (response: Ingredient[]) => {
        this.ingredients = response.sort((a: Ingredient, b: Ingredient) => a.nomIngredient.localeCompare(b.nomIngredient));
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      }
    })
  }

}
