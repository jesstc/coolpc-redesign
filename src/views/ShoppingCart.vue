<template>
  <n-flex vertical :size="10">
    <h1>購物車</h1>

    <n-flex vertical>
      <h3>選購產品</h3>

      <!-- first row -->
      <n-flex justify="space-between" class="w-full items-center text-center py-2" :style="{ backgroundColor: themeVars.buttonColor2Hover }">
        <span class="w-3/12">圖片</span>
        <span class="w-3/12">產品名稱/規格</span>
        <span class="w-1/12">單價</span>
        <span class="w-1/12">數量</span>
        <span class="w-1/12">總價</span>
        <span class="w-1/12">操作</span>
      </n-flex>

      <n-flex justify="space-between" class="w-full items-center py-2" :style="{ color: themeVars.closeIconColorHover }">
        <span class="w-1/12">產品類別～～～</span>
      </n-flex>

      <ShoppingCartItem />
    </n-flex>

    <n-flex vertical>
      <h3>付款聲明</h3>
    </n-flex>
  </n-flex>
</template>
  
<script setup lang="ts">
import ShoppingCartItem from '../components/ShoppingCartItem.vue'
import { NFlex, useThemeVars } from 'naive-ui'

const themeVars = useThemeVars();
</script>