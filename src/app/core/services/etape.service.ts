import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Etape } from "../interfaces/etape";

@Injectable({providedIn: 'root'})
export class EtapeService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}
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