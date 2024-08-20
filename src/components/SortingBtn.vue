<template>
  <n-flex class="items-center">
    <h4 v-if="props.isDesktop">排序依據：</h4>
    <n-button v-else @click="showBtnGroup = !showBtnGroup">
      <template #icon>
        <n-icon :component="ArrowSort20Regular" />
      </template>
      排序
    </n-button>

    <n-button-group 
      v-show="props.isDesktop || showBtnGroup"
      :vertical="!props.isDesktop"
      :class="!props.isDesktop && 'absolute top-12 right-0 z-10 shadow-md btn-bg'"
      >
      <n-button icon-placement="right" class="justify-between" @click="sorting('category')">
        產品類別
        <template #icon>
          <n-icon :component="getSortBtn('category')" />
        </template>
      </n-button>
      <n-button icon-placement="right" class="justify-between" @click="sorting('price')">
        價格
        <template #icon>
          <n-icon :component="getSortBtn('price')" />
        </template>
      </n-button>
      <n-button icon-placement="right" class="justify-between" @click="sorting('brand')">
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
import { ref } from 'vue';

const productStore = useProductStore();
const { sorter } = storeToRefs(productStore);

interface Props {
  isDesktop: Boolean,
}
const props = defineProps<Props>();

const showBtnGroup = ref(false);

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