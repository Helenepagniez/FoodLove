import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Etape } from 'src/app/core/interfaces/etape';
import { Recette } from 'src/app/core/interfaces/recette';
import { RecetteService } from 'src/app/core/services/recette.service';
import { EtapeService } from 'src/app/core/services/etape.service';
import { ToastrService } from 'ngx-toastr';

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
              private dialog: MatDialog,
              private fb: FormBuilder, 
              private router: Router,
              private etapeService: EtapeService,
              private toastr : ToastrService) { }

  ngOnInit(){
    this.updateform= this.fb.group({
      _id:[''],
      nomEtape: ['', [Validators.required]]
    });
    this.getOneRecette(this.route.snapshot.params['id']);
  }

  modify(etape: Etape) {
    this.etape=etape;
    document.getElementById("cancel")?.scrollIntoView({behavior:"smooth"});
  }

  unmodify() {
    this.etape = null;
  }

  onClickRecette(id: string) {
    this.router.navigate(['recette/', id]);
  }

  getOneRecette(recetteId: string) {
    this.recetteService.getOneRecette(recetteId).subscribe({
      next: (response: Recette) => {
        this.recette= response;
        this.etapes=response.etapes;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      }
    })
  };

  
  //modifier les étapes
  updateEtape(etape: Etape) {
    this.etapeService.updateEtape(etape, this.recette._id).subscribe({
      next: (response: Etape) => {
        this.unmodify();
        this.getOneRecette(this.recette._id);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      },
      complete: () => {
        this.toastr.success("Etape modifiée", "Modification étape", {
          positionClass: "toast-bottom-center" 
        });
      }
    });
  };

  //créer une étape
  addEtape() {
    let nouvelleEtape: any= {
      "nomEtape": "nouvelle étape"
    };
    this.etapeService.addEtape(nouvelleEtape, this.recette._id).subscribe({
      next: (response: Etape) => {
        this.getOneRecette(this.recette._id);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message, "Erreur serveur", {
          positionClass: "toast-bottom-center" 
        });
      },
      complete: () => {
        this.toastr.success("Etape ajoutée", "Ajout étape", {
          positionClass: "toast-bottom-center" 
        });
      }
    });
  };

  //supprimer une étape
  deleteEtape(etape: Etape, recetteId: number) {
    const dialogRef = this.dialog.open(DialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.etapeService.deleteEtape(etape, recetteId).subscribe({
          next: (response: Etape) => {
            this.getOneRecette(this.recette._id);
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error(error.message, "Erreur serveur", {
              positionClass: "toast-bottom-center" 
            });
          },
          complete : () => {
            this.toastr.success("Etape supprimée", "Suppression étape", {
              positionClass: "toast-bottom-center" 
            });
          },
        });
      }
    });
  };

}
