import { zh_TW, zh_CN, base, en, Faker } from '@faker-js/faker';
import { ProductInfo } from '../interfaces/product';

export const faker = new Faker({
  locale: [zh_TW, zh_CN, en, base],
});

export const categories = ['全部', '主機板', 'CPU', '記憶體', '螢幕', '顯示卡', '硬碟', '電源供應器', '機殼', '滑鼠', '鍵盤', '耳機', '音響', '風扇', '散熱器', '光碟機', '網卡', 'USB擴充', '路由器', '隨身碟', '桌上型電腦'];
export const categoriesForData = categories.slice(1);

export const categoriesWithBrands: Record<string, string[]> = categoriesForData.reduce((acc, category) => {
  acc[category] = Array.from({ length: faker.number.int({ min: 3, max: 5 }) }).map(() => faker.lorem.word({ length: { min: 5, max: 7 } }) );
  return acc;
}, {} as Record<string, string[]>);

export function generateMockProducts(count: number): ProductInfo[] {
  return Array.from({ length: count }).map((_cur, index) => {
    const category = faker.helpers.arrayElement(categoriesForData);
    return {
      id: index,
      name: faker.commerce.productName(),
      imgUrl: faker.image.urlLoremFlickr() ,
      price: parseInt(faker.commerce.price({ min: 1000, max: 50000, dec: 0 })),
      brand: faker.helpers.arrayElement(categoriesWithBrands[category]),  // select from 'categoriesWithBrands'
      category,
      description: faker.commerce.productDescription(),
      openboxUrl: Math.random() > 0.5 ? faker.internet.url() : undefined, // 50% 的機率會有
    };
  });
}
