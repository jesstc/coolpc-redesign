import { defineStore } from 'pinia';
import type { ProductInfo } from '../interfaces/product';
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    fetching: false,
    filters: {
      category: '' as string | null,
      brand: '' as string | null,
      priceRange: [1000, 50000] as [number, number],
    },
    sorter: {
      base: '', 
      direction: 'asc',
    },
    productItems: [] as Array<ProductInfo>,
  }),

  getters: {
    // list all product data based on the conditions of filter
    filteredItems: (state) => {
      return state.productItems.filter((item) => {
        const [minPrice, maxPrice] = state.filters.priceRange;

        const categoryMatch = state.filters.category?.length ? state.filters.category.includes(item.category) : true;
        const brandMatch = state.filters.brand?.length ? state.filters.brand.includes(item.brand) : true;
        const priceMatch = item.price >= minPrice && item.price <= maxPrice;
        
        return categoryMatch && brandMatch && priceMatch;
      })
    },
  },

  actions: {
    // fetching product data
    async fetchProductData() {
      try {
        this.fetching = true;
        const res = await axios.get('/api/products');
        this.productItems = res.data.items;
      } catch (err) {
        console.error('獲取資料時發生錯誤:', err);
      } finally {
        this.fetching = false;
      }
    },

    // update filter / sorter condition
    updateFilters(category?:string, brand?:string, price?:[number, number]) {
      if(category !== undefined) this.filters.category = category;
      if(brand !== undefined) this.filters.brand = brand;
      if(price !== undefined) this.filters.priceRange = price;
      console.log(this.filters)
    },
    updateSorter(base: 'category' | 'price' | 'brand', direction: 'asc' | 'desc') {
      this.sorter.base = base;
      this.sorter.direction = direction;
    },
  }
});
