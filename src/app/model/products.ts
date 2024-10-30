import {Binary} from "bson";

export class ProductsDTO{
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    count!: number;
    illustration!: Binary;
    productCategory!: string;
}
