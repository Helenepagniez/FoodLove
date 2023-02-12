import { Ingredient } from "./ingredient.model";

export interface Composant {
    _id: any;
    quantiteValue: number;
    unite: string | null;
    ingredientId: any;
    ingredient: Ingredient | null;
}