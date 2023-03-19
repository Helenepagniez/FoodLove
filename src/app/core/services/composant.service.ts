import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Composant } from "../interfaces/composant";

@Injectable({providedIn: 'root'})
export class ComposantService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

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
}