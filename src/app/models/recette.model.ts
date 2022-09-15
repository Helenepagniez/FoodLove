import { Etape } from "./etape.model";
import { Ingredient } from "./ingredient.model";

export interface Recette {
    _id: any;
    menu: string ;
    ingredients: Ingredient[];
    etapes: Etape[];
    portions: number;
    filtres: string[];
    temps: string;
    picture: string | null;
    video: string | null;
}