<template>
  <n-flex justify="space-around"
    class="w-full h-fit py-4 overflow-hidden items-center"
    :style="!props.isHoverContent && { backgroundColor: themeVars.tableColorHover }">

    <!-- product img -->
    <img v-if="!props.isHoverContent"
      class="w-3/12 h-24 object-scale-down bg-slate-300 items-center"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">

    <!-- product name / description -->
    <n-flex v-if="!props.isHoverContent" vertical :size="8" class="w-3/12">
      <h3>{{ props.product.name }}</h3>
      <span v-if="props.product.description" :style="{ color: themeVars.clearColorHover }">
        {{ props.product.description }}
      </span>
    </n-flex>
    <n-flex v-else class="w-2/12">
      <span>{{ props.product.name }}</span>
    </n-flex>

    <!-- per price -->
    <p>${{ props.product.price }}</p>

    <!-- number btn group -->
    <n-input-number class="h-fit text-center" :class="props.isHoverContent ? 'w-2/12' : 'w-1/12'"
      button-placement="both"
      min="1" max="100"
      v-model:value="currentCount"
    />

    <!-- total price -->
    <p v-if="!props.isHoverContent">${{ props.number*props.product.price }}</p>
    
    <!-- delete btn -->
    <n-button strong secondary type="error" class="h-fit py-1" @click="removeItem(props.product.id)">
      <template #icon>
        <n-icon :component="TrashOutline" />
      </template>
      <span v-if="!props.isHoverContent">刪除</span>
    </n-button>
  </n-flex>
</template>

<script setup lang="ts">
import { NFlex, NButton, NIcon, NInputNumber, useThemeVars } from 'naive-ui'
import { TrashOutline } from '@vicons/ionicons5'
import { computed, Ref } from 'vue';
import { ProductInfo } from '../interfaces/product'
import { useCartStore } from '../stores/cart';

const themeVars = useThemeVars();

export interface Props {
  product: ProductInfo,
  number: number,
  isHoverContent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isHoverContent: false,
})

// pinia
const cartStore = useCartStore();
const currentCount:Ref<number> = computed({
  get: () => cartStore.productNumberById(props.product.id),
  set: (newQuantity:number) => {
    cartStore.updateItem(props.product, newQuantity);
  },
});
const removeItem = (id: number) => {
  cartStore.removeItem(id);
}

</script>