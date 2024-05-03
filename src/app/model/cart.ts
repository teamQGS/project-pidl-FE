import {ProductsDTO} from "./products";

export class CartDTO {
  id!: String;
  username!: String;
  products!: ProductsDTO[];
}
