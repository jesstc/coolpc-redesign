import { defineStore } from 'pinia';
import type { CartItems } from '../interfaces/cart';
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
    },
    // Calculates the amount of specific product in the cart
    productNumberById: (state) => (productId: number) => {
      for (const item of state.cartItems) {
        const product = item.products.find((p) => p.id === productId);
        if (product) return product.number;
      }
      return -1;
    },
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

    // Adds or updates a product to the cart
    updateItem(product: ProductInfo, product_count: number, is_add?: boolean) {
      const category = product.category;
      const categoryItems = this.cartItems.find((item) => item.category === category);
    
      if (categoryItems) {
        const cartProduct = categoryItems.products.find((item) => item.id === product.id);
        if (cartProduct) {
          cartProduct.number = is_add ? cartProduct.number+product_count : product_count;
        } else {
          categoryItems.products.push({ id: product.id, productinfo: product, number: product_count });
        }
      } else {
        this.cartItems.push({
          category: category,
          products: [{ id: product.id, productinfo: product, number: product_count }],
        });
      }
    },

  }
});
