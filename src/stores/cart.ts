// stores/cart.ts
import { defineStore } from 'pinia';
import type { CartItems, CartProducts } from '../interfaces/cart';
import type { ProductInfo } from '../interfaces/product';

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
    updateItem(product: ProductInfo, product_count: number) {
      const category = product.category;
      const categoryItems = this.cartItems.find((item) => item.category === category);
    
      if (categoryItems) {
        const cartProduct = categoryItems.products.find((item) => item.id === product.id);
        if (cartProduct) cartProduct.number += product_count
        else {
          categoryItems.products.push({ id: product.id, productinfo: product, number: product_count });
        }
      } else {
        this.cartItems.push({
          category: category,
          products: [{ id: product.id, productinfo: product, number: product_count }],
        });
      }

      console.log(this.cartItems)
    }
  }
});
