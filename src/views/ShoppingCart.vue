<template>
  <n-flex vertical :size="32" class="overflow-scroll mb-12" :style="containerStyle">
    <h1>購物車</h1>

    <n-flex vertical :size="18">

      <!-- first row -->
      <n-flex justify="space-between" class="w-full items-center text-center py-2" :style="{ backgroundColor: themeVars.tableColorHover }">
        <span class="w-3/12">圖片</span>
        <span class="w-3/12">產品名稱/規格</span>
        <span class="w-1/12">單價</span>
        <span class="w-1/12">數量</span>
        <span class="w-1/12">總價</span>
        <span class="w-1/12">操作</span>
      </n-flex>

      <n-flex v-for="(item, index) in cartItems" :key="index" vertical :size="8">
        <n-flex justify="space-between" class="w-full items-center py-2" :style="{ color: themeVars.closeIconColorHover }">
          <span>{{ item.category }}</span>
        </n-flex>

        <ShoppingCartItem v-for="product in item.products"
          :key="product.id"
          :product="product.productinfo"
          :number="product.number"
        />
      </n-flex>
      
    </n-flex>

    <n-flex justify="space-around" class="w-full items-center text-right px-4 py-2 sticky buttom-0" :style="{ backgroundColor: themeVars.tableColorHover, zIndex: 10 }">
      <h1 class="w-full">總價： ${{ totalPrice }}</h1>
    </n-flex>
  </n-flex>
</template>
  
<script setup lang="ts">
import ShoppingCartItem from '../components/ShoppingCartItem.vue'
import { computed } from 'vue'
import { NFlex, useThemeVars } from 'naive-ui'
import { storeToRefs } from "pinia";
import { useCartStore } from '../stores/cart';
// import products from '../../mock/mockData';

// style
const themeVars = useThemeVars();
const containerStyle = computed(() => {
  return { height: 'calc(100vh-6rem)' };
});

// pinia
const cartStore = useCartStore();
const { cartItems, totalPrice } = storeToRefs(cartStore);

</script>
