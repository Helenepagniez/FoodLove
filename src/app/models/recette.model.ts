export class Recette {
    _id: any;
    menu!: string ;
    ingredients!: string[];
    quantites!: number[];
    etapes!: string[];
    portions!: number;
    filtres!: string[];
    temps!: string;
    unites!: string[];
    picture!: string | null;
    video!: string | null;
}