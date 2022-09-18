import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Etape } from 'src/app/models/etape.model';
import { Recette } from 'src/app/models/recette.model';
import { RecetteService } from 'src/app/services/recette.services';

@Component({
  selector: 'app-etapes',
  templateUrl: './etapes.component.html',
  styleUrls: ['./etapes.component.css']
})
export class EtapesComponent implements OnInit {
  etapes!: Etape[];
  updateform!: FormGroup;
  recette!: Recette;
  isModifying: boolean = false;
  constructor(private recetteService: RecetteService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit(){
    this.updateform= this.fb.group({
      nomEtape: ['', [Validators.required]]
    });
    this.getOneRecette(this.route.snapshot.params['id']);
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

  //modifier les recettes
  updateRecette(nouvelleRecette: Recette) {
    console.log(nouvelleRecette);

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
  };

}
