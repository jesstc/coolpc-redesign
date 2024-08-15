<template>
  <n-card :title="'【' + props.product.category + '】' + props.product.name" class="w-72">
    <template #cover>
      <img class="w-full object-cover" :src="props.product.imgUrl">
    </template>

    <template #header-extra>
      <n-tooltip v-if="props.product.openboxUrl" trigger="hover" placement="bottom">
        <template #trigger>
          <n-button strong secondary circle
            tag="a" target="_blank"
            :href="props.product.openboxUrl">
            <template #icon>
              <n-icon :component="Box" />
            </template>
          </n-button>
        </template>
        開箱討論
      </n-tooltip>
    </template>

    <n-badge :value="props.product.brand" :color="themeVars.iconColorHover" />
    <br>
    {{ props.product.description || '' }}
    
    <template #footer>
      <span>${{ props.product.price }}</span>
    </template>

    <template #action>
      <div class="flex flex-col lg:flex-row lg:justify-between gap-2 w-full">
        <!-- number btn group -->
        <n-input-number class="w-full lg:w-5/12 text-center" 
          button-placement="both"
          :default-value="1"
          min="1" max="100"
          v-model:value="currentCount"
        />
        <!-- add to cart btn -->
        <n-button strong secondary type="primary" class="w-full lg:w-auto px-2" @click="addToCart(props.product, currentCount)">
          <template #icon>
            <n-icon :component="Add" />
          </template>
          加入購物車
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../stores/cart';
import { ProductInfo } from '../interfaces/product'
import { NIcon, NCard, NButton, NInputNumber, NTooltip, NBadge, useThemeVars } from 'naive-ui'
import { Box } from '@vicons/carbon';
import { Add } from '@vicons/ionicons5'

const cartStore = useCartStore();

const themeVars = useThemeVars();

const currentCount = ref(1);

interface Props {
  product: ProductInfo,
}
const props = defineProps<Props>();

const addToCart = (product:ProductInfo, count:number) => {
  cartStore.updateItem(product, count, true);
}
</script>