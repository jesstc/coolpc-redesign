import { zh_TW, zh_CN, base, en, Faker } from '@faker-js/faker';
import { ProductInfo } from '../interfaces/product';

export const faker = new Faker({
  locale: [zh_TW, zh_CN, en, base],
});

export const categories = ['主機板', 'CPU', '記憶體', '螢幕', '顯示卡', '硬碟', '電源供應器', '機殼', '滑鼠', '鍵盤', '耳機', '音響', '風扇', '散熱器', '光碟機', '網卡', 'USB擴充', '路由器', '隨身碟', '桌上型電腦'];

export function generateMockProducts(count: number): ProductInfo[] {
  return Array.from({ length: count }).map((_cur, index) => ({
    id: index,
    name: faker.commerce.productName(),
    imgUrl: faker.image.urlLoremFlickr() ,
    price: parseInt(faker.commerce.price({ min: 1000, max: 50000, dec: 0 })),
    brand: faker.company.name(),
    category: faker.helpers.arrayElement(categories),
    description: faker.commerce.productDescription(),
    openboxUrl: Math.random() > 0.5 ? faker.internet.url() : undefined, // 50% 的機率會有
  }));
}
