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
        :value="comparedCategory"
        @update:value="handleUpdateCategory" >
        <n-tab 
          v-for="(category, key) in categoriesForData"
          :key="key" :name="category" />
      </n-tabs>
    </div>

    <!-- comparison table -->
    <div class="overflow-x-auto w-5/6 whitespace-nowrap scrollbar-hide flex items-stretch gap-8 mt-8">

      <n-flex
        v-if="categoryComparedItems"
        v-for="(product, key) in categoryComparedItems" :key="key"
        :size="24" vertical
        class="flex-col items-center text-center w-44 md:w-64 flex-shrink-0" >

        <!-- 產品名稱 -->
        <h3 class="primary-color">{{ product.name }}</h3>

        <!-- 產品圖片 -->
        <img :src="product.imgUrl" :alt="product.name" class="w-44 h-44 md:w-64 md:h-64 object-contain" />

        <!-- 描述 -->
        <p class="w-full h-full md:h-44 text-wrap flex items-center px-4">{{ product.description }}</p>

        <!-- 品牌 -->
        <n-tag :bordered="false">
          {{ product.brand }}
        </n-tag>

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
          移除比較
        </n-button>

      </n-flex>

      <!-- add btn -->
      <div class="flex items-center mr-4 my-4">
        <n-float-button 
          shape="square" position="relative"
          class="flex flex-col h-24 justify-center p-2 ml-8 md:ml-16 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-150"
          :style="{width: 'auto', height: 'auto', backgroundColor: themeVars.tabColor }"
          @click="showModal = true" >
          <n-icon :component="AddCircleOutline" :size="44"  class="text-3xl mt-2" />
          <template #description>
            <h4 class="my-2">新增比較產品</h4>
          </template>
        </n-float-button>
        <n-modal
          v-model:show="showModal"
          preset="dialog"
          title="新增比較產品"
          positive-text="新增"
          negative-text="取消"
          @positive-click="addSelectedProduct"
          @negative-click="showModal = false"
        >
          <template #default>
            <n-flex vertical class="w-full mt-4 mb-6">
              <p>目前比較的產品類別為：{{ comparedCategory }}</p>
              <n-select
                :options="productNames"
                placeholder="請選擇想要新增比較的產品"
                @update:value="changeAddedItem"
              />
            </n-flex>
          </template>
        </n-modal>
      </div>

    </div>

  </n-flex>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NFlex, NTag, NTabs, NTab, NButton, NFloatButton, NModal, NSelect, NIcon, useThemeVars } from 'naive-ui'
import { categoriesForData } from '../mock/mockData';
import { storeToRefs } from "pinia";
import { useComparisonStore } from '../stores/comparison';
import { useProductStore } from '../stores/product';
import { ProductInfo } from '../interfaces/product';
import { TrashOutline, AddCircleOutline } from '@vicons/ionicons5'

const selectedProduct = ref<ProductInfo | null>(null)

// style
const themeVars = useThemeVars();

// pinia
const comparisonStore = useComparisonStore();
const productStore = useProductStore();
const { productNames, comparedCategory, categoryComparedItems } = storeToRefs(comparisonStore);
const { productItems } = storeToRefs(productStore);

const showModal = ref(false);

onMounted(() => {
  comparisonStore.updateCategoryComparedItems();
  comparisonStore.getProductNameByCategory(productItems.value);
});

// change category
const handleUpdateCategory = (value:string) => {
  comparisonStore.changeCategory(value);
  comparisonStore.updateCategoryComparedItems();
  comparisonStore.getProductNameByCategory(productItems.value);
}

// add item
const addSelectedProduct = () => {
  if (selectedProduct.value) {
    comparisonStore.addComparedItem(selectedProduct.value);
    comparisonStore.updateCategoryComparedItems()
    comparisonStore.updateSelection();
    selectedProduct.value = null;
    showModal.value = false;
  }
}
// remove item
const removeProduct = (productId: number) => {
  comparisonStore.removeComparedItem(productId);
  comparisonStore.updateCategoryComparedItems()
  comparisonStore.updateSelection();
}

const changeAddedItem = (value:string) => {
  selectedProduct.value = productStore.getProductInfoByName(value);
}
</script>
