import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Composant } from "../interfaces/composant";
import { Etape } from "../interfaces/etape";
import { Ingredient } from "../interfaces/ingredient";
import { Recette } from "../interfaces/recette";

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

    public deleteIngredient(ingredient: Ingredient, recetteId: number): Observable<Ingredient> {
        return this.http.patch<Ingredient>(`${this.apiServerUrl}/api/recette/suppression-ingredient/${recetteId}`, ingredient,{
            withCredentials: true,
        });
    };

    public addComposant(composant: Composant, recetteId: number): Observable<Composant> {
        return this.http.patch<Composant>(`${this.apiServerUrl}/api/recette/ajout-composant/${recetteId}`, composant,{
            withCredentials: true,
        });
    };

    public updateComposant(composant: Composant, recetteId: number): Observable<Composant> {
        return this.http.patch<Composant>(`${this.apiServerUrl}/api/recette/modification-composant/${recetteId}`, composant,{
            withCredentials: true,
        });
    };

    public deleteComposant(composant: Composant, recetteId: number): Observable<Composant> {
        return this.http.patch<Composant>(`${this.apiServerUrl}/api/recette/suppression-composant/${recetteId}`, composant,{
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

    public deleteEtape(etape: Etape, recetteId: number): Observable<Etape> {
        return this.http.patch<Etape>(`${this.apiServerUrl}/api/recette/suppression-etape/${recetteId}`, etape,{
            withCredentials: true,
        });
    };
}