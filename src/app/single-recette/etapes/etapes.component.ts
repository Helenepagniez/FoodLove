import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Etape } from 'src/app/models/etape.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recette } from 'src/app/models/recette.model';
import { RecetteService } from 'src/app/services/recette.services';

@Component({
  selector: 'app-etapes',
  templateUrl: './etapes.component.html',
  styleUrls: ['./etapes.component.css']
})
export class EtapesComponent implements OnInit {
  
  etape!: Etape | null;
  etapes!: Etape[];
  updateform!: FormGroup;
  recette!: Recette;
  isModifying: boolean = false;

  constructor(private recetteService: RecetteService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private fb: FormBuilder, 
              private router: Router) { }

  ngOnInit(){
    this.updateform= this.fb.group({
      _id:[''],
      nomEtape: ['', [Validators.required]]
    });
    this.getOneRecette(this.route.snapshot.params['id']);
  }

  modify(etape: Etape) {
    this.etape=etape;
  }

  unmodify() {
    this.etape = null;
  }

  onClickRecette(id: string) {
    this.router.navigate(['recette/', id]);
  }

  getOneRecette(recetteId: string) {
    this.recetteService.getOneRecette(recetteId).subscribe(
      (response: Recette) => {
        this.recette= response;
        this.etapes=response.etapes;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };

  
  //modifier les étapes
  updateEtape(etape: Etape) {
    this.recetteService.updateEtape(etape, this.recette._id).subscribe(
      (response: Etape) => {
        this.snackBar.open("étapes modifiées", "Fermer", {duration: 1000}).afterDismissed().subscribe(() => {
          location.reload();
      });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

  //créer une étape
  addEtape() {
    let nouvelleEtape: any= {
      "nomEtape": "nouvelle étape"
    };
    this.recetteService.addEtape(nouvelleEtape, this.recette._id).subscribe(
      (response: Etape) => {
        this.snackBar.open("étape ajoutée", "Fermer", {duration: 2000});
        this.getOneRecette(this.recette._id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  };

  //supprimer une étape
  deleteEtape(etape: Etape, recetteId: number) {
    const dialogRef = this.dialog.open(DialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.recetteService.deleteEtape(etape, recetteId).subscribe(
          (response: Etape) => {
            this.snackBar.open("Etape supprimée", "Fermer", {duration: 1000}).afterDismissed().subscribe(() => {
              location.reload();
            });
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
  };

}
