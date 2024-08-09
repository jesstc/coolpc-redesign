<template>
  <n-layout has-sider>
    <n-layout-sider>
      Handian Bridge
    </n-layout-sider>

    <n-layout>
      <n-layout-header>產品列表</n-layout-header>

      <n-layout-content class="py-8">
        <div class="flex flex-wrap justify-between gap-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </n-layout-content>
    </n-layout>

  </n-layout>
</template>
  
<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue'
</script>