import {ProductsDTO} from "./products";

export class OrderDTO {
  id!: number;
  date!: Date;
  customerUsername!: string;
  managerUsername!: string;
  products!: ProductsDTO[];
  totalSum!: number | undefined;
  status!: string;
}
