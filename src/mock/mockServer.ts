import Mock from 'mockjs';
import { generateMockProducts } from './mockData'

export const productData = Mock.mock('/api/products', 'get', {
  items: generateMockProducts(50),
  code: 200,
  message: 'success',
});

// 输出结果
console.log(JSON.stringify(productData))
