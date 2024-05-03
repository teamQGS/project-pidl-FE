import {ProductsDTO} from "./products";

export class CartDTO {
  id!: string;
  username!: string;
  products!: ProductsDTO[];
}
