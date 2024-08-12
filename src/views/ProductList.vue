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
import FilterArea from '../components/FilterArea.vue'
import SortingBtn from '../components/SortingBtn.vue'
</script>