import { defineStore } from 'pinia';
import type { ProductInfo, ComparedProducts } from '../interfaces/product';
import { SelectGroupOption } from 'naive-ui';

export const useComparisonStore = defineStore('comparison', {
  state: () => ({
    comparedCategory: '主機板' as string,
    productNames: [] as Array<SelectGroupOption>,
    categoryComparedItems: [] as Array<ProductInfo>|undefined,
    comparedItems: [] as Array<ComparedProducts>,
  }),

  getters: {
  },

  actions: {
    // update compared products of specific category
    updateCategoryComparedItems() {
      this.categoryComparedItems = this.comparedItems.find((item) => item.category === this.comparedCategory)?.products || []
    },

    // add item to the compared product
    addComparedItem(product: ProductInfo) {
      const addedCategory = this.comparedItems.find((item) => item.category === product.category)
      if (addedCategory) {
        const addedItemIndex = addedCategory.products.findIndex((item) => item.id === product.id)
        if (addedItemIndex === -1) addedCategory.products.push(product)  // 避免重複添加
      } else {
        this.comparedItems.push({ category: product.category, products: [product] })
      }
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

    // get product names (groupby brands) based on the selected categories
    getProductNameByCategory(all_products: ProductInfo[]):void {
      const products = all_products.filter((item) => item.category === this.comparedCategory);
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
      this.updateSelection();
    },

    // update the add item selection options (disabled compared option)
    updateSelection() {
      const categoryProducts = this.comparedItems.find(item => item.category === this.comparedCategory)?.products || []
      this.productNames.forEach(group => {
        if (group.children) {
          group.children.forEach(option => {
            option.disabled = categoryProducts.some(product => product.name === option.value)
          })
        }
      })
    },

    changeCategory (newCategory: string) {
      this.comparedCategory = newCategory;
    }
  }
});
