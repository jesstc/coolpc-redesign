import { defineStore } from 'pinia';
import type { ProductInfo } from '../interfaces/product';
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    fetching: false,
    searchQuery: '',
    filters: {
      category: [],
      brand: [],
      priceRange: [0, 1000],
    },
    sorter: {
      base: '', 
      direction: 'asc',
    },
    productItems: [] as Array<ProductInfo>,
  }),

  getters: {
    
  },

  actions: {
    // fetching product data
    async fetchProductData() {
      try {
        this.fetching = true;
        const res = await axios.get('/api/products');
        this.productItems = res.data.items;
        console.log('產品資料已成功獲取:', this.productItems);
      } catch (err) {
        console.error('獲取資料時發生錯誤:', err);
      } finally {
        this.fetching = false;
      }
    }

    
  }
});
