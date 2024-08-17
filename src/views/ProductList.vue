<template>
  <n-spin :show="fetching">
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
          <div class="flex flex-wrap justify-stretch gap-6">
            <ProductCard v-for="(product, index) in filteredItems" :key="index" :product="product" />
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
import { onMounted } from 'vue'
import { storeToRefs } from "pinia";
import { useProductStore } from '../stores/product';

// get all product data
const productStore = useProductStore();
const { filteredItems, fetching } = storeToRefs(productStore);

onMounted(() => {
  productStore.fetchProductData();
});
</script>