export class OrderDTO {
  id!: string;
  date!: Date;
  userId!: string;
  productIds!: [];
  totalSum!: number | undefined;
  status!: string;
}
