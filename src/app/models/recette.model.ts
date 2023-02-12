import { Composant } from "./composant.model";
import { Etape } from "./etape.model";

export interface Recette {
    _id: any;
    posterId: string;
    menu: string;
    composants: Composant[];
    etapes: Etape[];
    portions: number | null;
    etoile: number;
    filtres: string[];
    temps: string;
    picture: string | null;
}