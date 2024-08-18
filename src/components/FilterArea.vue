<template>
  <n-card embedded :bordered="false" class="flex w-full gap-5">
    <template #header>
      <n-flex class="flex items-center">
        <n-icon :component="FunnelOutline" :color="themeVars.primaryColorPressed" /> 
        <h3 :style="{ color: themeVars.primaryColorPressed }">篩選條件</h3>
      </n-flex>
    </template>

    <n-flex vertical wrap-item :size="32">

      <n-flex vertical>
        <h4>產品類別</h4>
        <n-select
          placeholder="請選擇產品類別"
          :options="filterOptions.categories"
          :value="filters.category"
          @update:value="handleUpdateCategories"
        />
      </n-flex>
      
      <n-flex vertical :size="18">
        <h4>價格區間</h4>
        <n-slider v-model:value="priceRange" range
                  :marks="marks" :step="100" :min="500" :max="50000" />
        <div class="flex justify-between items-center w-full">
          <n-input-number class="w-5/12 inline text-center" 
                          v-model:value="priceRange[0]" size="small" :show-button="false" :step="100" :min="500" :max="priceRange[1]"/>
          <span>～</span>
          <n-input-number class="w-5/12 inline text-center" 
                          v-model:value="priceRange[1]" size="small" :show-button="false" :step="100" :min="priceRange[0]" :max="50000"/>
        </div>
      </n-flex>

      <n-flex vertical>
        <h4>品牌</h4>
        <n-select
          multiple filterable
          :placeholder="filterOptions.brands.length ? '請選擇品牌' : '請先選擇產品類別'"
          :options="filterOptions.brands"
          v-model:value="filters.brand"
          @update:value="handleUpdateBrands"
        />
      </n-flex>

    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NFlex, NInputNumber, NSelect, NSlider, NIcon, useThemeVars } from 'naive-ui'
import { ref, onMounted, watch } from 'vue'
import { FunnelOutline } from '@vicons/ionicons5';
import { storeToRefs } from "pinia";
import { useProductStore } from '../stores/product';

const themeVars = useThemeVars();

const productStore = useProductStore();
const { filters, filterOptions } = storeToRefs(productStore);

onMounted(() => {
  productStore.getCategories();
  productStore.getBrandsByCategory(filters.value.category);
});

const handleUpdateCategories = (value:string):void => {
  productStore.getBrandsByCategory(value);
  productStore.updateFilters(value);
}

const handleUpdateBrands = (value: string):void => {
  productStore.updateFilters(undefined, value);
}

// price range
const priceRange = ref(filters.value.priceRange);
const marks = ref({ [priceRange.value[0]]: 'min', [priceRange.value[1]]: 'max' });
watch(priceRange, (newVal) => {
  if (priceRange.value[0] > priceRange.value[1]) {
    // switch the numbers to make sure [min, max] (and min < max)
    [priceRange.value[0], priceRange.value[1]] = [priceRange.value[1], priceRange.value[0]];
  }
  productStore.updateFilters(undefined, undefined, newVal);
}, { deep: true })

</script>