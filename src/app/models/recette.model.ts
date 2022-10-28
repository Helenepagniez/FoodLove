import { Etape } from "./etape.model";
import { Ingredient } from "./ingredient.model";

export interface Recette {
    _id: any;
    posterId: string;
    menu: string ;
    ingredients: Ingredient[];
    etapes: Etape[];
    portions: number | null;
    etoile: number;
    filtres: string[];
    temps: string;
    picture: string | null;
}