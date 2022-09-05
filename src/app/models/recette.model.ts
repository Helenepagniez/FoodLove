import { Etape } from "./etape.model";
import { Ingredient } from "./ingredient.model";

export class Recette {
    _id: any;
    menu!: string ;
    ingredients!: Ingredient[];
    quantites!: number[];
    etapes!: Etape[];
    portions!: number;
    filtres!: string[];
    temps!: string;
    unites!: string[];
    picture!: string | null;
    video!: string | null;
}