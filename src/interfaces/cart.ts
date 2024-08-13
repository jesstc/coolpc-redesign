import { ProductInfo } from './product'

export interface CartProducts {
  readonly id: number;
  productinfo: ProductInfo;
  number: number;
}

export interface CartItems {
  category: string;
  products: Array<CartProducts>;
}
