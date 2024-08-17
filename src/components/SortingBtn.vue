<template>
  <n-flex class="items-center">
    <h4>排序依據：</h4>
    <n-button-group>
      <n-button icon-placement="right"  @click="categorySorting">
        產品類別
        <template #icon>
          <n-icon v-if="categorySort%2 == 1" :component="ArrowSortUp20Regular" />
          <n-icon v-else-if="categorySort%2 == 0" :component="ArrowSortDown20Regular" />
          <n-icon v-else :component="ArrowSort20Regular" />
        </template>
      </n-button>
      <n-button icon-placement="right" @click="priceSorting">
        價格
        <template #icon>
          <n-icon v-if="priceSort%2 == 1" :component="ArrowSortUp20Regular" />
          <n-icon v-else-if="priceSort%2 == 0" :component="ArrowSortDown20Regular" />
          <n-icon v-else :component="ArrowSort20Regular" />
        </template>
      </n-button>
      <n-button icon-placement="right" @click="brandSorting">
        品牌
        <template #icon>
          <n-icon v-if="brandSort%2 == 1" :component="ArrowSortUp20Regular" />
          <n-icon v-else-if="brandSort%2 == 0" :component="ArrowSortDown20Regular" />
          <n-icon v-else :component="ArrowSort20Regular" />
        </template>
      </n-button>
    </n-button-group>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowSort20Regular, ArrowSortDown20Regular, ArrowSortUp20Regular } from '@vicons/fluent'
import { NFlex, NButtonGroup, NButton, NIcon } from 'naive-ui'
import { useProductStore } from '../stores/product';

const productStore = useProductStore();

const categorySort = ref<number>(-1);
const priceSort = ref<number>(-1);
const brandSort = ref<number>(-1);

const resetSortingStatus = (currentSort: "price" | "brand" | "category"):void => {
  let isAsc:boolean = false;

  if (currentSort != 'category') categorySort.value = -1;
  else {
    categorySort.value = (categorySort.value+1) % 2;
    categorySort.value == 0 && (isAsc = true);
  }
  if (currentSort != 'price') priceSort.value = -1;
  else {
    priceSort.value = (priceSort.value+1) % 2;
    priceSort.value == 0 && (isAsc = true);
  }
  if (currentSort != 'brand') brandSort.value = -1;
  else {
    brandSort.value = (brandSort.value+1) % 2;
    brandSort.value == 0 && (isAsc = true);
  }

  productStore.updateSorter(currentSort, isAsc);
}

const categorySorting = ():void => {
  resetSortingStatus('category');
}

const priceSorting = ():void => {
  resetSortingStatus('price');
}

const brandSorting = ():void => {
    resetSortingStatus('brand');
}
</script>