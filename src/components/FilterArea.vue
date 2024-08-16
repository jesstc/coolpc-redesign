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
          multiple filterable
          placeholder="請選擇品牌"
          :options="brands"
          @update:value="handleUpdateBrands"
        />
      </n-space>

    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { SelectOption, SelectGroupOption, NCard, NSpace, NInputNumber, NSelect, NSlider } from 'naive-ui'
import { reactive, ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

const error = ref("");
let categories:SelectOption[] = ([]);
let brands = ref<SelectGroupOption[]>([]);

// get categories
const getCategories = async () => {
  try {
    const res = await axios.get('/api/categories');
    
    for (const category of res.data.categories) {
      const cur_cat:SelectOption = {label: category, value: category};
      categories.push(cur_cat);
    }
  } catch (err) {
    error.value = '無法獲取產品類別資料';
    console.error('獲取資料時發生錯誤:', err);
  }
}
onMounted(() => {
  getCategories();
});

// get brands by given category
const getBrandsByCategory = async (category: string) => {
  try {
    const res = await axios.get('/api/brands?'+ category);
    const newBrands = res.data.brands.map((cat_brand:any) => {
      const { category, brand } = cat_brand;
      return {
        type: 'group',
        label: category,
        key: category,
        children: brand.map((b: string) => ({ label: b, value: b })),
      };
    });
    brands.value = newBrands; 
    console.log(brands.value)
    await nextTick(); 
  } catch (err) {
    error.value = '無法獲取產品類別資料';
    console.error('獲取資料時發生錯誤:', err);
  }
}

const handleUpdateCategories = (value: string, option: SelectOption):void => {
  console.log(value, option);
  getBrandsByCategory(value);
}

const handleUpdateBrands = (value: string, option: SelectOption):void => {
  console.log(value, option);
}

// price range
let min = ref(1000);
let max = ref(50000);
let value = ref([min.value, max.value]);
let marks = reactive({[min.value]: 'min', [max.value]: 'max'});

</script>