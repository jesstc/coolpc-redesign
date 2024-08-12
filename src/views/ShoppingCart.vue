<template>
  <n-flex vertical :size="10">
    <h1>購物車</h1>

    <n-flex vertical>
      <h3>選購產品</h3>
      <ShoppingCartItem />
    </n-flex>

    <n-flex vertical>
      <h3>付款聲明</h3>
    </n-flex>
  </n-flex>
</template>
  
<script setup lang="ts">
import ShoppingCartItem from '../components/ShoppingCartItem.vue'
import { NFlex } from 'naive-ui'
</script>