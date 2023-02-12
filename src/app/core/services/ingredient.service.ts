import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Ingredient } from "../interfaces/ingredient";

@Injectable({providedIn: 'root'})
export class IngredientService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getIngredients(): Observable<Ingredient[]> {
        return this.http.get<any>(`${this.apiServerUrl}/api/ingredient`,{
            withCredentials: true,
        });
    };

    public getOneIngredient(idIngredient: string): Observable<Ingredient> {
        return this.http.get<any>(`${this.apiServerUrl}/api/ingredient/${idIngredient}`,{
            withCredentials: true,
        });
    };
}