import { defineStore } from 'pinia';
import type { ProductInfo, ComparedProducts } from '../interfaces/product';

export const useComparisonStore = defineStore('comparison', {
  state: () => ({
    comparedItems: [] as Array<ComparedProducts>,
  }),

  getters: {
    // list all compared products of specific category
    getComparedByCategory: (state) => (category: string) => {
      return state.comparedItems.find((item) => item.category === category)?.products;
    },
  },

  actions: {
    // add item to the compared product
    addComparedItem(product: ProductInfo) {
      const addedCategory = this.comparedItems.find((item) => item.category === product.category);
      
      if (addedCategory) {
        const addedItemIndex = addedCategory.products.findIndex((item) => item.id === product.id);
        if (addedItemIndex === -1) addedCategory.products.push(product);  // avoid dupilicated
      }
      else this.comparedItems.push({ category: product.category, products: [product] });
    },

    // remove item
    removeComparedItem(product_id: number) {
      this.comparedItems.forEach((item, index) => {
        const productIndex = item.products.findIndex(product => product.id === product_id);
        if (productIndex !== -1) {
          item.products.splice(productIndex, 1);
          // If the category has no products left, remove the entire category
          if (item.products.length === 0) {
            this.comparedItems.splice(index, 1);
          }
        }
      });
    },
  }
});
