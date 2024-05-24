import {ProductsDTO} from "./products";

export class OrderDTO {
  id!: string;
  date!: Date;
  customerUsername!: string;
  managerUsername!: string;
  products!: ProductsDTO[];
  totalSum!: number | undefined;
  status!: string;
}
