// stores/cart.ts
import { defineStore } from 'pinia';
import type { CartItems, CartProducts } from '../interfaces/cart';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as Array<CartItems>,
  }),

  getters: {
    // Calculates the total price of all products in the cart
    totalPrice: (state) => {
      return state.cartItems.reduce((total, item) => {
        return total + item.products.reduce((itemTotal, product) => {
          return itemTotal + (product.productinfo.price * product.number);
        }, 0);
      }, 0);
    }
  },

  actions: {
    // Removes a product by its id from the cart
    removeItem(product_id: number) {
      this.cartItems.forEach((item, index) => {
        const productIndex = item.products.findIndex(product => product.id === product_id);
        if (productIndex !== -1) {
          item.products.splice(productIndex, 1);
          // If the category has no products left, remove the entire category
          if (item.products.length === 0) {
            this.cartItems.splice(index, 1);
          }
        }
      });
    },

    // Updates or adds a product to the cart
    updateItem(product_id: number, product_count: number, productInfo: CartProducts) {
      let found = false;
      this.cartItems.forEach((item) => {
        const product = item.products.find(product => product.id === product_id);
        if (product) {
          product.number = product_count;
          found = true;
        }
      });

      // If the product wasn't found, add it to the appropriate category
      if (!found) {
        const category = productInfo.productinfo.category;
        let categoryItem = this.cartItems.find(item => item.category === category);
        if (!categoryItem) {
          categoryItem = { category, products: [] };
          this.cartItems.push(categoryItem);
        }
        categoryItem.products.push({
          id: product_id,
          productinfo: productInfo.productinfo,
          number: product_count,
        });
      }
    }
  }
});
