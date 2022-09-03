import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
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

    public addRecette(recette: Recette): Observable<Recette> {
        return this.http.post<Recette>(`${this.apiServerUrl}/api/recette`, recette,{
            withCredentials: true,
        });
    };

    public updateRecette(recetteId: number, recette: Recette): Observable<Recette> {
        return this.http.put<Recette>(`${this.apiServerUrl}/api/recette/${recetteId}`, recette,{
            withCredentials: true,
        });
    };

    public deleteRecette(recetteId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/recette/${recetteId}`,{
            withCredentials: true,
        });
    };

}