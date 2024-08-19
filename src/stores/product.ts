import { defineStore } from 'pinia';
import type { ProductInfo } from '../interfaces/product';
import { SelectOption, SelectGroupOption } from 'naive-ui'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    fetching: false,
    filterOptions: {
      categories: [] as Array<SelectOption>,
      brands: [] as Array<SelectGroupOption>,
    },
    filters: {
      category: '全部' as string,
      brand: '' as string,
      priceRange: [1000, 50000] as [number, number],
    },
    sorter: {
      base: 'category', 
      isAsc: true,
    },
    productNames: [] as Array<SelectGroupOption>,
    productItems: [] as Array<ProductInfo>,
  }),

  getters: {
    // list all product data based on the conditions of filter
    filteredItems: (state) => {
      return state.productItems.filter((item) => {
        const [minPrice, maxPrice] = state.filters.priceRange;

        const categoryMatch = (state.filters.category?.length && state.filters.category != "全部") ? state.filters.category.includes(item.category) : true;
        const brandMatch = state.filters.brand?.length ? state.filters.brand.includes(item.brand) : true;
        const priceMatch = item.price >= minPrice && item.price <= maxPrice;
        
        return categoryMatch && brandMatch && priceMatch;
      }).sort((a, b) => {
        if (state.sorter.base == 'category') {
          if (state.sorter.isAsc) return a.category.localeCompare(b.category);
          return b.category.localeCompare(a.category);
        } else if (state.sorter.base == 'brand') {
          if (state.sorter.isAsc) return a.brand.localeCompare(b.brand);
          return b.brand.localeCompare(a.brand);
        } else {  // price
          if (state.sorter.isAsc) return a.price - b.price;
          return b.price - a.price;
        }
      });
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
        this.filterOptions.categories = [];
        for (const category of res.data.categories) {
          const cur_cat:SelectOption = {label: category, value: category};
          this.filterOptions.categories.push(cur_cat);
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
        this.filterOptions.brands = newBrands; 
      } catch (err) {
        console.error('獲取資料時發生錯誤:', err);
      }
    },

    // update filter / sorter condition
    updateFilters(category?:string, brand?:string, price?:[number, number]) {
      if(category !== undefined) this.filters.category = category;
      if(brand !== undefined) this.filters.brand = brand;
      if(price !== undefined) this.filters.priceRange = price;
    },
    updateSorter(base: 'category' | 'price' | 'brand', isAsc: boolean) {
      this.sorter.base = base;
      this.sorter.isAsc = isAsc;
    },

    // get product names (groupby brands) based on the selected categories
    getProductNameByCategory(category: string) {
      const products = this.productItems.filter((item) => item.category === category);
      products.sort((a, b) => a.name.localeCompare(b.name));

      // get brands 
      const brands = [...new Set(products.map(product => product.brand))];
      this.productNames = brands.map((brand: string) => {
        return {
          type: 'group',
          label: brand,
          key: brand,
          children: products.filter((item) => item.brand === brand).map((item) => ({ label:item.name, value:item.name })),
        };
      });
    },
  }
});
