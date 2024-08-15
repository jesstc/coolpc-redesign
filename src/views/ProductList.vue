<template>
  <n-spin :show="loading">
    <n-layout has-sider>

      <n-layout-sider>
        <FilterArea />
      </n-layout-sider>

      <n-layout class="pl-8">
        <n-layout-header class="flex justify-between items-center">
          <h1>產品列表</h1>

          <SortingBtn />
        </n-layout-header>

        <n-layout-content class="py-8">
          <div class="flex flex-wrap justify-between gap-6">
            <ProductCard v-for="(product, index) in products" :key="index" :product="product" />
          </div>
        </n-layout-content>
      </n-layout>

    </n-layout>
  </n-spin>
</template>
  
<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue'
import FilterArea from '../components/FilterArea.vue'
import SortingBtn from '../components/SortingBtn.vue'
import { NLayout, NLayoutContent, NLayoutSider, NLayoutHeader, NSpin } from 'naive-ui'
import { ref, onMounted } from 'vue'
import { ProductInfo } from '../interfaces/product'
import axios from 'axios'

const products = ref<ProductInfo[]>([]);
const error = ref("");
const loading = ref(false);

// get all product data
const getProductData = async () => {
  try {
    loading.value = true;
    const res = await axios.get('/api/products');
    products.value = res.data.items;
    console.log('產品資料已成功獲取:', products.value);
  } catch (err) {
    error.value = '無法獲取產品資料';
    console.error('獲取資料時發生錯誤:', err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getProductData();
});
</script>