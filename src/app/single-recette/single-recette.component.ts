import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etape } from '../models/etape.model';
import { Ingredient } from '../models/ingredient.model';
import { Recette } from '../models/recette.model';
import { RecetteService } from '../services/recette.services';

@Component({
  selector: 'app-single-recette',
  templateUrl: './single-recette.component.html',
  styleUrls: ['./single-recette.component.css']
})
export class SingleRecetteComponent implements OnInit {

  recette!: Recette;
  ingredients!: Ingredient[];
  etapes!: Etape[];

  constructor( private recetteService: RecetteService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getOneRecette(this.route.snapshot.params['id']);
  }

  getOneRecette(recetteId: string) {
    
    this.recetteService.getOneRecette(recetteId).subscribe(
      (response: Recette) => {
        this.recette= response;
        this.etapes=response.etapes;
        this.ingredients=response.ingredients;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };
}
