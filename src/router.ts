import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ProductList from './views/ProductList.vue';
import ShoppingCart from './views/ShoppingCart.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/shopping-cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;