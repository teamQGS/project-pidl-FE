import { ObjectId } from "bson";

export class ProductsDTO{
    id!: ObjectId;
    name!: String;
    description!: String;
    price!: number;
    illustration!: String;
}
