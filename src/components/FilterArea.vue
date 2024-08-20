<template>
  <n-card v-if="props.isDesktop" embedded :bordered="false" class="flex w-full gap-5">
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

  <!-- filter btn (show when not desktop) -->
  <n-button v-else @click="showModal = true">
    <template #icon>
      <n-icon :component="FunnelOutline" />
    </template>
    篩選
  </n-button>
  <n-modal v-model:show="showModal">
    <n-card 
      :bordered="false" aria-modal="true" closable
      :style="isMobile ? 'width: 100vw; position: fixed; bottom: 0px;' : 'width: 50vw;'" 
    >
      <template #header>
        <n-flex class="flex items-center">
          <n-icon :component="FunnelOutline" :color="themeVars.primaryColorPressed" /> 
          <h1 :style="{ color: themeVars.primaryColorPressed }">篩選條件</h1>
        </n-flex>
      </template>

      <template #default>
        <n-flex vertical wrap-item :size="32">

          <n-flex vertical>
            <h3>產品類別</h3>
            <n-select
              placeholder="請選擇產品類別"
              :options="filterOptions.categories"
              :value="filters.category"
              @update:value="handleUpdateCategories"
            />
          </n-flex>
          
          <n-flex vertical :size="18">
            <h3>價格區間</h3>
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
            <h3>品牌</h3>
            <n-select
              multiple filterable
              :placeholder="filterOptions.brands.length ? '請選擇品牌' : '請先選擇產品類別'"
              :options="filterOptions.brands"
              v-model:value="filters.brand"
              @update:value="handleUpdateBrands"
            />
          </n-flex>

        </n-flex>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { NCard, NModal, NFlex, NInputNumber, NSelect, NSlider, NIcon, NButton, useThemeVars } from 'naive-ui'
import { useWindowSize } from '@vueuse/core';
import { ref, onMounted, watch, computed } from 'vue'
import { FunnelOutline } from '@vicons/ionicons5';
import { storeToRefs } from "pinia";
import { useProductStore } from '../stores/product';

interface Props {
  isDesktop: Boolean,
}
const props = defineProps<Props>();

const themeVars = useThemeVars();

const showModal = ref(false);
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

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