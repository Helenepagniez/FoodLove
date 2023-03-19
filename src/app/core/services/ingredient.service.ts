import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Ingredient } from "../interfaces/ingredient";

@Injectable({providedIn: 'root'})
export class IngredientService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getOneIngredientById(idIngredient: string): Observable<Ingredient> {
        return this.http.get<any>(`${this.apiServerUrl}/api/ingredient/${idIngredient}`,{
            withCredentials: true,
        });
    };

    public getOneIngredientByName(nomIngredient: string): Observable<Ingredient> {
        return this.http.get<any>(`${this.apiServerUrl}/api/ingredient/nom/${nomIngredient}`,{
            withCredentials: true,
        });
    };

    public getIngredients(): Observable<Ingredient[]> {
        return this.http.get<any>(`${this.apiServerUrl}/api/ingredient/`,{
            withCredentials: true,
        });
    };

    public addIngredient(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.post<Ingredient>(`${this.apiServerUrl}/api/ingredient/`, ingredient,{
            withCredentials: true,
        });
    };

    public updateIngredient(ingredient: Ingredient, ingredientId: string): Observable<Ingredient> {
        return this.http.put<Ingredient>(`${this.apiServerUrl}/api/ingredient/${ingredientId}`, ingredient,{
            withCredentials: true,
        });
    };

    public deleteIngredient(ingredientId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/ingredient/${ingredientId}`,{
            withCredentials: true,
        });
    };
}