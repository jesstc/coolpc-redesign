<template>
  <n-spin :show="fetching">
    <n-layout has-sider>

      <n-layout-sider>
        <FilterArea />
      </n-layout-sider>

      <n-layout class="pl-8">
        <n-layout-header>
          <n-flex vertical>
            <n-flex justify="space-between" class="items-center">
              <h1>產品列表</h1>
              <SortingBtn />
            </n-flex>

            <!-- category tabs -->
            <div
              class="overflow-x-auto w-full whitespace-nowrap scrollbar-hide"
              :style="{backgroundColor: themeVars.tabColor}" >
              <n-tabs 
                type="segment" tab-style="padding: 8px 12px;" animated 
                class="inline-block"
                :value="filters.category"
                @update:value="handleUpdateCategory" >
                <n-tab 
                  v-for="(category, key) in filterOptions.categories"
                  :key="key" :name="(category.label as string)" />
              </n-tabs>
            </div>
          </n-flex>
        </n-layout-header>

        <n-layout-content class="py-8">
          <!-- pagination -->
          <n-flex v-if="filteredItems.length" justify="end" class="w-full mb-4">
            <n-pagination 
              v-model:page="pagination.currentPage" 
              :page-count="pagination.totalPage"
              :page-size="pagination.pageItems"
              @update:page="handlePageChange" />
          </n-flex>

          <!-- product items -->
          <n-grid v-if="filteredItems.length" cols="1 s:1 m:2 l:3 xl:4" responsive="screen" :x-gap="24" :y-gap="32">
            <n-grid-item v-for="(product, key) in filteredItems" :key="key">
              <ProductCard :product="product" />
            </n-grid-item>
          </n-grid>
          <n-flex v-else>
            <p class="w-full text-center">查無產品</p>
          </n-flex>

          <!-- pagination -->
          <n-flex v-if="filteredItems.length" justify="center" class="w-full mt-12">
            <n-pagination size="large"
              v-model:page="pagination.currentPage" 
              :page-count="pagination.totalPage"
              :page-size="pagination.pageItems"
              @update:page="handlePageChange" />
          </n-flex>

        </n-layout-content>
      </n-layout>

    </n-layout>
  </n-spin>
</template>
  
<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue'
import FilterArea from '../components/FilterArea.vue'
import SortingBtn from '../components/SortingBtn.vue'
import { NLayout, NLayoutContent, NLayoutSider, NLayoutHeader, NGrid, NGridItem, NSpin, NTabs, NTab, NFlex, NPagination, useThemeVars } from 'naive-ui'
import { storeToRefs } from "pinia";
import { useProductStore } from '../stores/product';

const themeVars = useThemeVars();

// get all product data
const productStore = useProductStore();
const { filteredItems, fetching, filterOptions, filters, pagination } = storeToRefs(productStore);

const handleUpdateCategory = (value: string) => {
  productStore.updateFilters(value);
  productStore.getBrandsByCategory(value);
  productStore.setCurrentPage(1);
}

const handlePageChange = (page: number) => {
  productStore.setCurrentPage(page);
}

</script>
