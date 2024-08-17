<template>
  <n-card title="篩選條件" embedded :bordered="false" class="w-full">
    <n-space vertical wrap-item :item-style="{ marginTop: '1.5rem' }">
      <n-space vertical>
        <h4>產品類別</h4>
        <n-select
          multiple
          placeholder="請選擇產品類別"
          :options="filterOptios.categories"
          v-model:value="filters.category"
          @update:value="handleUpdateCategories"
        />
      </n-space>
      
      <n-space vertical>
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
      </n-space>

      <n-space vertical>
        <h4>品牌</h4>
        <n-select
          multiple filterable
          placeholder="請選擇品牌"
          :options="filterOptios.brands"
          v-model:value="filters.brand"
          @update:value="handleUpdateBrands"
        />
      </n-space>

    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NSpace, NInputNumber, NSelect, NSlider } from 'naive-ui'
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from "pinia";
import { useProductStore } from '../stores/product';

const productStore = useProductStore();
const { filters, filterOptios } = storeToRefs(productStore);

onMounted(() => {
  productStore.getCategories();
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