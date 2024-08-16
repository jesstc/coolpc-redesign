import Mock from 'mockjs';
import { generateMockProducts, categories, categoriesWithBrands } from './mockData'

interface MockOptions {
  url: string;
  type: string; 
  body: string;
  headers?: Record<string, string>; 
}

// get product data
Mock.mock('/api/products', 'get', {
  items: generateMockProducts(50),
  code: 200,
});

// get categories of the product
Mock.mock('/api/categories', 'get', {
  categories: categories.sort(),
  code: 200,
});

// get the brand name by given category
Mock.mock(/\/api\/brands/, 'get', (options:MockOptions) => {
  const url_categories = options.url.split('?')[1].split(',').sort();
  let brands = [];
  for (const category of url_categories) {
    brands.push({category: category, brand: categoriesWithBrands[category]})
  }
  return {
    brands,
    code: 200,
  };
});
