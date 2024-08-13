<template>
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
</template>
  
<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue'
import FilterArea from '../components/FilterArea.vue'
import SortingBtn from '../components/SortingBtn.vue'
import { NLayout, NLayoutContent, NLayoutSider, NLayoutHeader } from 'naive-ui'
import { ProductInfo } from '../interfaces/product'

const products:Array<ProductInfo> = [
  { id: 1, name: 'PRO WS W680-ACE', imgUrl: '../assets/logo.png', price: 10000, brand: '華碩', category: '主機板' },
  { id: 2, name: 'PRO WS SE', imgUrl: '../assets/logo.png', price: 15000, brand: '華碩', category: '主機板' },
  { id: 3, name: 'B76M Plus Wifi', imgUrl: '../assets/logo.png', price: 15900, brand: '神罰', category: '中央處理器 CPU' },
];

</script>