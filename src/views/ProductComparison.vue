<template>
  <n-flex vertical :size="32" align="center" class="overflow-scroll mb-12">
    <h1 class="w-full">產品比較</h1>

    <!-- category tabs -->
    <div
      class="overflow-x-auto w-full whitespace-nowrap scrollbar-hide"
      :style="{backgroundColor: themeVars.tabColor}" >
      <n-tabs 
        type="segment" tab-style="padding: 8px 12px;" animated 
        class="inline-block"
        v-model:value="selectedCategory" >
        <n-tab 
          v-for="(category, key) in categoriesForData"
          :key="key" :name="category" />
      </n-tabs>

      
    </div>

    <!-- comparison table -->
    <div class="overflow-x-auto w-5/6 whitespace-nowrap scrollbar-hide flex gap-8 mt-8">

      <n-flex
        v-for="(product, index) in comparedProducts" :key="index"
        :size="24" vertical
        class="flex-col items-center text-center w-64 flex-shrink-0" >

        <!-- 產品名稱 -->
        <n-select
          :value="product.name"
          :options="productNames"
          placeholder="請選擇想要比較的產品"
          class="w-full"
        />

        <!-- 產品圖片 -->
        <img :src="product.imgUrl" :alt="product.name" class="w-64 h-64 object-contain" />

        <!-- 描述 -->
        <p class="w-full h-2/6 text-wrap flex items-center px-4">{{ product.description }}</p>

        <!-- 品牌 -->
        <n-badge :value="product.brand" color="grey" />

        <!-- 價格 -->
        <p>${{ product.price }}</p>

        <!-- 開箱討論區 -->
        <p v-if="product.openboxUrl">
          <a :href="product.openboxUrl" target="_blank" class="text-blue-500 underline">
            查看開箱討論區
          </a>
        </p>
        <p v-else>無開箱討論區</p>
        
        <!-- 移除按鈕 -->
        <n-button secondary type="error" @click="removeProduct(product.id)">
          <template #icon><n-icon :component="TrashOutline" /></template>
          移除
        </n-button>

      </n-flex>
    </div>

  </n-flex>
</template>
  
<script setup lang="ts">
import { computed, ref, h, onMounted, watch } from 'vue'
import { NFlex, NBadge, NTabs, NTab, NButton, NSelect, NIcon, useThemeVars } from 'naive-ui'
import { categoriesForData } from '../mock/mockData';
import { storeToRefs } from "pinia";
import { useComparisonStore } from '../stores/comparison';
import { useProductStore } from '../stores/product';
import { ProductInfo } from '../interfaces/product';
import { TrashOutline } from '@vicons/ionicons5'

const selectedProduct = ref<ProductInfo | null>(null)

// style
const themeVars = useThemeVars();

// pinia
const comparisonStore = useComparisonStore();
const productStore = useProductStore();
const { productNames } = storeToRefs(productStore);

const selectedCategory = ref("主機板");
const comparedProducts = computed(() => comparisonStore.getComparedByCategory(selectedCategory.value));

onMounted(() => {
  productStore.getProductNameByCategory(selectedCategory.value);
});

watch(selectedCategory, (newCategory: string) => {
  productStore.getProductNameByCategory(newCategory);
});

// add item
const addSelectedProduct = () => {
  if (selectedProduct.value) {
    comparisonStore.addComparedItem(selectedProduct.value)
    selectedProduct.value = null
  }
}
// remove item
const removeProduct = (productId: number) => {
  comparisonStore.removeComparedItem(productId)
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
