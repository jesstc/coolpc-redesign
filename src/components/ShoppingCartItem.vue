<template>
  <n-flex justify="space-around"
    class="w-full h-fit overflow-hidden items-center"
    :class="props.isHoverContent ? 'py-1' : 'p-4'"
    :style="!props.isHoverContent && { backgroundColor: themeVars.codeColor }">

    <!-- product img -->
    <img v-if="!props.isHoverContent"
      class="flex-auto h-24 object-scale-down items-center"
      :class="isDesktop ? 'w-3/12' : 'w-2/12'"
      :src="props.product.imgUrl">

    <!-- product name / description -->
    <n-flex v-if="!props.isHoverContent" vertical :size="8" class="flex-auto" :class="isDesktop ? 'w-3/12' : 'w-2/12'">
      <h3>{{ props.product.name }}</h3>
      <span v-if="props.product.description && isDesktop" :style="{ color: themeVars.clearColorHover }">
        {{ props.product.description }}
      </span>
    </n-flex>
    <n-flex v-else class="flex-auto w-2/6 pl-2">
      <span>{{ props.product.name }}</span>
    </n-flex>

    <!-- per price -->
    <p 
      :class="props.isHoverContent ? 'w-1/6' : 'w-1/12'"
      class="flex-auto text-center" >
      ${{ props.product.price }}
    </p>

    <!-- number btn group -->
    <n-input-number 
      class="h-fit text-center flex-auto" 
      :class="props.isHoverContent ? 'w-1/6' : 'w-1/12'"
      button-placement="both"
      min="1" max="100"
      v-model:value="currentCount"
    />

    <!-- total price -->
    <p v-if="!props.isHoverContent && isDesktop" class="flex-auto w-1/12 text-center">
      ${{ props.number*props.product.price }}
    </p>
    
    <!-- delete btn -->
    <n-button 
      strong secondary type="error" 
      class="h-fit py-1 flex-auto" :class="props.isHoverContent ? 'w-1/6 py-2' : 'w-1/12 mx-4'"
      @click="removeItem(props.product.id)">
      <template #icon>
        <n-icon :component="TrashOutline" />
      </template>
      <span v-if="!props.isHoverContent && isDesktop">刪除</span>
    </n-button>
  </n-flex>
</template>

<script setup lang="ts">
import { NFlex, NButton, NIcon, NInputNumber, useThemeVars, useDialog } from 'naive-ui'
import { TrashOutline, Warning } from '@vicons/ionicons5'
import { useWindowSize } from '@vueuse/core';
import { computed, Ref, h } from 'vue';
import { ProductInfo } from '../interfaces/product'
import { useCartStore } from '../stores/cart';

const { width } = useWindowSize();
const isDesktop = computed(() => width.value > 1024);

const dialog = useDialog();

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
  get: () => cartStore.productCounterById(props.product.id),
  set: (newQuantity:number) => {
    cartStore.updateItem(props.product, newQuantity);
  },
});
const removeItem = (id: number) => {
  dialog.error({
    title: '你確定要從購物車刪除此產品？',
    icon: () => {
      return h(NIcon, { size: 24 }, { default: () => h(Warning) });
    },
    positiveText: '刪除',
    negativeText: '取消',
    onPositiveClick: () => {
      cartStore.removeItem(id);
    },
  })
}

</script>