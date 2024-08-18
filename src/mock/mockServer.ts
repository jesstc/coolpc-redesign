import Mock from 'mockjs';
import { generateMockProducts, categories, categoriesForData, categoriesWithBrands } from './mockData'

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
  categories: categories,
  code: 200,
});

// get the brand name by given category
Mock.mock(/\/api\/brands/, 'get', (options:MockOptions) => {
  const url_category = options.url.split('?')[1];
  let brands = [];
  if (url_category == "全部") {
    for (const category of categoriesForData) {
      brands.push({category: category, brand: categoriesWithBrands[category]});
    }
  } else brands.push({category: url_category, brand: categoriesWithBrands[url_category]});
  console.log(url_category ,brands)
  return {
    brands,
    code: 200,
  };
});
