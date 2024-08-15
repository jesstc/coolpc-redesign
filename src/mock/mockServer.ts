import Mock from 'mockjs';
// const Mock = require('mockjs');

const categories = ['主機板', 'CPU', '記憶體', '螢幕', '顯示卡', '硬碟', '電源供應器', '機殼', '滑鼠', '鍵盤', '耳機', '音響', '風扇', '散熱器', '光碟機', '網卡', 'USB擴充', '路由器', '隨身碟', '桌上型電腦'];

export const productData = Mock.mock('/api/products', 'get', {
  'items|50': [ // 生成 50 個產品
    {
      'id|+1': 1, // 自增的 id
      'name': '@ctitle(5, 10)', // 隨機生成產品名稱
      'imgUrl': '@image("200x200", "#ffcc00", "Product")', // 隨機生成圖片 URL
      'price|1000-50000': 1, // 隨機生成價格
      'brand': '@company', // 隨機生成品牌名稱
      'category|1': categories, // 隨機選擇一個類別
      'description': '@csentence(10, 20)', // 隨機生成產品描述
      'openboxUrl': '@url()' // 隨機生成 URL，有 50% 的機率出現
    } 
  ],
  code: 200,
  message: 'success',
});

// 输出结果
console.log(JSON.stringify(productData))
