<template>
  <n-card title="篩選條件" embedded :bordered="false" class="w-full">
    <n-space vertical wrap-item :item-style="{ marginTop: '1.5rem' }">
      <n-space vertical>
        <h4>產品類別</h4>
        <n-select
          multiple
          placeholder="請選擇產品類別"
          :options="categories"
          @update:value="handleUpdateCategories"
        />
      </n-space>
      
      <n-space vertical>
        <h4>價格區間</h4>
        <n-slider v-model:value="value" range
                  :marks="marks" :step="100" :min="500" :max="50000" />
        <div class="flex justify-between items-center w-full">
          <n-input-number class="w-5/12 inline text-center" 
                          v-model:value="value[0]" size="small" :show-button="false" :step="100"/>
          <span>～</span>
          <n-input-number class="w-5/12 inline text-center" 
                          v-model:value="value[1]" size="small" :show-button="false" :step="100"/>
        </div>
      </n-space>

      <n-space vertical>
        <h4>品牌</h4>
        <n-select
          multiple
          placeholder="請選擇品牌"
          :options="brands"
          @update:value="handleUpdateBrands"
        />
      </n-space>

    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { SelectOption, NCard, NSpace, NInputNumber, NSelect, NSlider } from 'naive-ui'
import { reactive, ref } from 'vue'

// categories options
const handleUpdateCategories = (value: string, option: SelectOption):void => {
  console.log(value, option);
}
const categories = [
  { label: '組裝推薦', value: 'recommendations' },
  { label: 'What goes on', value: 'song8' },
  { label: 'Girl', value: 'song9' },
  { label: 'I\'m looking through you', value: 'song10' }
];

// price range
let min = ref(1000);
let max = ref(50000);
let value = ref([min.value, max.value]);
let marks = reactive({[min.value]: 'min', [max.value]: 'max'});

// brand options
const handleUpdateBrands = (value: string, option: SelectOption):void => {
    console.log(value, option);
}
const brands = [
  { label: '華碩', value: 'asus' },
  { label: '聯想', value: 'lenevo' },
];

</script>