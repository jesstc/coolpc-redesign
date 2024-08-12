<template>
  <n-flex class="items-center">
    <h4>排序依據：</h4>
    <n-button-group>
      <n-button icon-placement="right"  @click="categorySorting">
        產品類別
        <template #icon>
          <n-icon v-if="categorySort%3 == 1" :component="ArrowSortDown20Regular" />
          <n-icon v-else-if="categorySort%3 == 2" :component="ArrowSortUp20Regular" />
          <n-icon v-else :component="ArrowSort20Regular" />
        </template>
      </n-button>
      <n-button icon-placement="right" @click="priceSorting">
        價格
        <template #icon>
          <n-icon v-if="priceSort%3 == 1" :component="ArrowSortDown20Regular" />
          <n-icon v-else-if="priceSort%3 == 2" :component="ArrowSortUp20Regular" />
          <n-icon v-else :component="ArrowSort20Regular" />
        </template>
      </n-button>
      <n-button icon-placement="right" @click="brandSorting">
        品牌
        <template #icon>
          <n-icon v-if="brandSort%3 == 1" :component="ArrowSortDown20Regular" />
          <n-icon v-else-if="brandSort%3 == 2" :component="ArrowSortUp20Regular" />
          <n-icon v-else :component="ArrowSort20Regular" />
        </template>
      </n-button>
    </n-button-group>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowSort20Regular, ArrowSortDown20Regular, ArrowSortUp20Regular } from '@vicons/fluent'

const categorySort = ref<number>(0);
const priceSort = ref<number>(0);
const brandSort = ref<number>(0);

const resetSortingStatus = (currentSort:string):void => {
    if (currentSort != 'category') categorySort.value = 0;
    else categorySort.value = (categorySort.value+1) % 3;

    if (currentSort != 'price') priceSort.value = 0;
    else priceSort.value = (priceSort.value+1) % 3;

    if (currentSort != 'brand') brandSort.value = 0;
    else brandSort.value = (brandSort.value+1) % 3;
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