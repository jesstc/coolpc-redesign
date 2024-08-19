export interface ProductInfo {
  readonly id: number;
  name: string;
  imgUrl: string;
  price: number;
  brand: string;
  category: string;
  description: string;
  openboxUrl?: string;
}

export interface ComparedProducts {
  category: string;
  products: Array<ProductInfo>;
}