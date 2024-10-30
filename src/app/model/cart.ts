import {ProductsDTO} from "./products";

export class CartDTO {
  id!: number;
  username!: string;
  products!: ProductsDTO[];
}
