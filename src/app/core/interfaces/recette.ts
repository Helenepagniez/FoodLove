import { Composant } from "./composant";
import { Etape } from "./etape";

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