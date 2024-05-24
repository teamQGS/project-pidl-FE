import {Binary} from "bson";

export class ProductsDTO{
    id!: string;
    name!: string;
    description!: string;
    price!: number;
    count!: number;
    illustration!: Binary;
    category!: string;
}
