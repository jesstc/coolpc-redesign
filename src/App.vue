<template>
  <n-config-provider :theme="isDarkTheme ? darkTheme : lightTheme">
    <n-layout>
      <n-layout-header bordered class="fixed z-10">
        <Navbar @updateTheme="updateTheme" :shoppingCart="shoppingCart" />
      </n-layout-header>

      <n-layout-content class="mx-8 mt-32 mb-4 md:mx-24 md:mb-14 h-full">
        <!-- views -->
        <router-view />
      </n-layout-content>

      <n-layout-footer bordered class="px-8 py-6 md:px-24 h-full">
        <n-space class="flex gap-8 items-center">
          <img
            class="cursor-pointer h-14 md:h-16" alt="CoolPC Logo"
            src="./assets/logo.png"
          />
          <span>Copyright 2024 Jessica Huang | 7jesstc1999@gmail.com </span>
        </n-space>
      </n-layout-footer>
      
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, lightTheme, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NConfigProvider, NSpace } from 'naive-ui'
import { ref, Ref } from 'vue'
import Navbar from './components/Navbar.vue'
import { CartItems } from './interfaces/cart'

let isDarkTheme:Ref<boolean> = ref<boolean>(false);

const updateTheme = (newVal: Ref<boolean>) => {
  isDarkTheme.value = newVal.value;
};

// for test
const shoppingCart:Array<CartItems> = [
  { category: '主機板',
    products: [
      { id: 1, productinfo: {id: 1, name: 'PRO WS W680-ACE', imgUrl: '../assets/logo.png', price: 10000, brand: '華碩', category: '主機板'}, number: 2 },
      { id: 2, productinfo: {id: 2, name: 'PRO WS SE', imgUrl: '../assets/logo.png', price: 15000, brand: '華碩', category: '主機板'}, number: 1 },
    ]
  },
  { category: '中央處理器 CPU',
    products: [
      { id: 1, productinfo: {id: 1, name: 'B76M Plus Wifi', imgUrl: '../assets/logo.png', price: 15900, brand: '神罰', category: '中央處理器 CPU'}, number: 1 },
    ]
  },
];
</script>
