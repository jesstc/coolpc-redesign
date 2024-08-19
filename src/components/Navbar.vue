<template>
  <nav class="flex flex-row py-4 items-center justify-between gap-16 px-8 md:px-24">

    <img
      class="cursor-pointer h-14 md:h-16" alt="CoolPC Logo"
      src="../assets/logo.png"
      @click="navigateToHome"
    />

    <!-- menu items -->
    <n-tabs 
      v-if="!isMobile" 
      size="large" justify-content="end" animated
      :value="selectedValue"
      @update:value="handleMenuSelect">

      <n-tab v-for="option in menuOptions"
        :key="option.key"
        :name="option.link"
        class="mx-8">
        <n-popover v-if="option.key === 'shopping-cart'" style="max-height: 70vh" trigger="hover" :width="500" scrollable>
          <template #trigger>
            <n-flex class="flex-row items-center gap-4">
              <n-icon :component="option.icon" size="28" />
              <h4>{{ option.label }}</h4>
            </n-flex>
          </template>

          <!-- shopping cart hover content -->
          <n-flex v-if="cartItems.length">
            <n-flex justify="space-around" class="w-full items-center text-center py-2" :style="{ backgroundColor: themeVars.tableColorHover }">
              <span>產品名稱</span>
              <span>單價</span>
              <span>數量</span>
              <span>操作</span>
            </n-flex>

            <n-flex vertical v-for="(item, index) in cartItems" :key="index">
              <span>{{ item.category }}</span>
              <ShoppingCartItem v-for="product in item.products" 
                :key="product.id"
                :product="product.productinfo"
                :number="product.number"
                isHoverContent />
            </n-flex>

            <n-divider style="margin: 1rem 0;" />

            <n-flex class="w-full items-center text-right px-4 py-2">
              <p class="w-full">總價： ${{ totalPrice }}</p>
            </n-flex>
          </n-flex>
          <n-flex v-else>購物車內沒有產品</n-flex>

        </n-popover>
        <n-flex v-else class="flex-row items-center gap-4">
          <n-icon :component="option.icon" size="28" />
          <h4>{{ option.label }}</h4>
        </n-flex> 

      </n-tab>

    </n-tabs>

    <!-- dark/light theme switch -->
    <n-button v-if="!isMobile" @click="changeTheme">
      {{ isDarkTheme ? '淺色模式' : '深色模式' }}
    </n-button>

    <!-- menu btn (for mobile device) -->
    <button v-else @click="toggleMobileMenu">
      <n-icon :component="MenuOutline" size="24" />
    </button>

    <!-- side menu (for mobile device) -->
    <n-drawer v-model:show="isMobileMenuOpen" placement="right">
      <img
        class="cursor-pointer w-11/12 ml-2 my-10" width="100" alt="CoolPC Logo"
        src="../assets/logo.png"
        @click="navigateToHome"
        />

      <n-tabs 
        size="large" justify-content="end" placement="right" animated
        :value="selectedValue"
        @update:value="handleMenuSelect">

        <n-tab v-for="option in menuOptions"
          :key="option.key"
          :name="option.link"
          class="mx-8">
          <n-flex class="flex-row items-center gap-4">
            <n-icon :component="option.icon" size="28" />
            <h4>{{ option.label }}</h4>
          </n-flex>
        </n-tab>

      </n-tabs>
      
      <!-- dark/light theme switch -->
      <n-button class="w-8/12 ml-8 mt-6" @click="changeTheme">
        {{ isDarkTheme ? '淺色模式' : '深色模式' }}
      </n-button>
    </n-drawer>

  </nav>
</template>

<script setup lang="ts">

import { useRouter, useRoute } from 'vue-router';
import { NIcon, NDrawer, NButton, NTabs, NTab, NFlex, NPopover, NDivider, useThemeVars } from 'naive-ui'
import { ref, Ref, computed, shallowRef, markRaw } from 'vue'
import { useWindowSize } from '@vueuse/core';
import { storeToRefs } from "pinia";
import { useCartStore } from '../stores/cart';
import { ReaderOutline, CartOutline, MenuOutline } from '@vicons/ionicons5'
import { Compare } from '@vicons/carbon'
import ShoppingCartItem from './ShoppingCartItem.vue';

const themeVars = useThemeVars();

// handle the switch of nav mode
const isMobileMenuOpen = ref(false);
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// change dark/light theme
let isDarkTheme: Ref<boolean> = ref<boolean>(false);
const emit = defineEmits<{
  (e: 'updateTheme', value: Ref<boolean>): void
}>();
const changeTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
    emit('updateTheme', isDarkTheme);
}

// redirect to homepage if click logo
const navigateToHome = () => {
  router.push('/');
  isMobileMenuOpen.value = false;
};

// nav options
const router = useRouter();
let selectedValue = ref(useRoute().fullPath);
const menuOptions = shallowRef([
  { label: '產品列表', key: 'product-list', link: '/', icon: markRaw(ReaderOutline) },
  { label: '產品比較', key: 'product-comparison', link: '/product-comparison', icon: markRaw(Compare) },
  { label: '購物車', key: 'shopping-cart', link: '/shopping-cart', icon: markRaw(CartOutline) }
]);
const handleMenuSelect = (key: string) => {
  router.push(key);
  isMobileMenuOpen.value = false;
  selectedValue.value = key;
};

// pinia
const cartStore = useCartStore();
const { cartItems, totalPrice } = storeToRefs(cartStore);

</script>