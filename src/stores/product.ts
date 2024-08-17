import { defineStore } from 'pinia';
import type { ProductInfo } from '../interfaces/product';
import { SelectOption, SelectGroupOption } from 'naive-ui'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    fetching: false,
    filterOptios: {
      categories: [] as Array<SelectOption>,
      brands: [] as Array<SelectGroupOption>,
    },
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
    // get categories
    async getCategories() {
      try {
        const res = await axios.get('/api/categories');
        
        for (const category of res.data.categories) {
          const cur_cat:SelectOption = {label: category, value: category};
          this.filterOptios.categories.push(cur_cat);
        }
      } catch (err) {
        console.error('獲取資料時發生錯誤:', err);
      }
    },
    // get brands based on the selected categories
    async getBrandsByCategory(category: string) {
      try {
        const res = await axios.get('/api/brands?'+ category);
        const newBrands = res.data.brands.map((cat_brand:any) => {
          const { category, brand } = cat_brand;
          return {
            type: 'group',
            label: category,
            key: category,
            children: brand.map((b: string) => ({ label: b, value: b })),
          };
        });
        this.filterOptios.brands = newBrands; 
        // await nextTick(); 
      } catch (err) {
        console.error('獲取資料時發生錯誤:', err);
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
