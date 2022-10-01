import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Etape } from "../models/etape.model";
import { Ingredient } from "../models/ingredient.model";
import { Recette } from "../models/recette.model";

@Injectable({providedIn: 'root'})
export class RecetteService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getRecettes(): Observable<Recette[]> {
        return this.http.get<any>(`${this.apiServerUrl}/api/recette`,{
            withCredentials: true,
        });
    };

    public getOneRecette(recetteId: string): Observable<Recette> {
        return this.http.get<any>(`${this.apiServerUrl}/api/recette/${recetteId}`,{
            withCredentials: true,
        });
    };

    public addRecette(recette: Recette): Observable<Recette> {
        return this.http.post<Recette>(`${this.apiServerUrl}/api/recette`, recette,{
            withCredentials: true,
        });
    };

    public updateRecette(recetteId: number, nouvelleRecette: Recette): Observable<Recette> {
        return this.http.put<Recette>(`${this.apiServerUrl}/api/recette/${recetteId}`, nouvelleRecette,{
            withCredentials: true,
        });
    };

    public deleteRecette(recetteId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/recette/${recetteId}`,{
            withCredentials: true,
        });
    };

    public addIngredient(ingredient: Ingredient, recetteId: number): Observable<Ingredient> {
        return this.http.patch<Ingredient>(`${this.apiServerUrl}/api/recette/ajout-ingredient/${recetteId}`, ingredient,{
            withCredentials: true,
        });
    };

    public updateIngredient(ingredient: Ingredient, recetteId: number): Observable<Ingredient> {
        return this.http.patch<Ingredient>(`${this.apiServerUrl}/api/recette/modification-ingredient/${recetteId}`, ingredient,{
            withCredentials: true,
        });
    };

    public addEtape(etape: Etape, recetteId: number): Observable<Etape> {
        return this.http.patch<Etape>(`${this.apiServerUrl}/api/recette/ajout-etape/${recetteId}`, etape,{
            withCredentials: true,
        });
    };

    public updateEtape(etape: Etape, recetteId: number): Observable<Etape> {
        return this.http.patch<Etape>(`${this.apiServerUrl}/api/recette/modification-etape/${recetteId}`, etape,{
            withCredentials: true,
        });
    };

}