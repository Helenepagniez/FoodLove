export class Recette {
    _id: any;
    menu!: string ;
    ingredients!: string[];
    quantites!: number[];
    etapes!: string[];
    portions!: number;
    picture!: string | null;
    video!: string | null;
}