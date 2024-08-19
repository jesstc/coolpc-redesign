<template>
  <n-flex class="items-center">
    <h4>排序依據：</h4>
    <n-button-group>
      <n-button icon-placement="right"  @click="sorting('category')">
        產品類別
        <template #icon>
          <n-icon :component="getSortBtn('category')" />
        </template>
      </n-button>
      <n-button icon-placement="right" @click="sorting('price')">
        價格
        <template #icon>
          <n-icon :component="getSortBtn('price')" />
        </template>
      </n-button>
      <n-button icon-placement="right" @click="sorting('brand')">
        品牌
        <template #icon>
          <n-icon :component="getSortBtn('brand')" />
        </template>
      </n-button>
    </n-button-group>
  </n-flex>
</template>

<script setup lang="ts">
import { ArrowSort20Regular, ArrowSortDown20Regular, ArrowSortUp20Regular } from '@vicons/fluent'
import { NFlex, NButtonGroup, NButton, NIcon } from 'naive-ui'
import { useProductStore } from '../stores/product';
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { sorter } = storeToRefs(productStore);

// update the sorting btn status
const sorting = (sortType: 'category' | 'price' | 'brand'):void => {
  let isAsc:boolean = sorter.value.base == sortType ? !sorter.value.isAsc : true;
  productStore.updateSorter(sortType, isAsc);
}

// decide the display btn
const getSortBtn = (sortType: 'category' | 'price' | 'brand') => {
  if (sorter.value.base !== sortType) return ArrowSort20Regular;
  else if (sorter.value.isAsc) return ArrowSortDown20Regular;
  else return ArrowSortUp20Regular;
}
</script>