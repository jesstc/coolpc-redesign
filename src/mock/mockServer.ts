import Mock from 'mockjs';
import { generateMockProducts, categories, categoriesWithBrands } from './mockData'

// get product data
Mock.mock('/api/products', 'get', {
  items: generateMockProducts(50),
  code: 200,
});

// get categories of the product
Mock.mock('/api/categories', 'get', {
  categories,
  code: 200,
});

// get the brand name by given category
Mock.mock('/api/brands', 'get', (category:string) => {
  return {
    brands: categoriesWithBrands[category],
    code: 200,
  };
});
