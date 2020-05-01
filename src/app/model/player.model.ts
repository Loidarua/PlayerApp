import { stringify } from 'querystring';

export class PlayerModel{

    id: string;
    nombre:string;
    poder: string;
    estudiante:boolean;


    constructor(){
        this.estudiante=true;
    }

    

}