<template>
  <nav class="flex flex-row py-4 items-center justify-between border-2 border-b-stone-200 px-8 md:px-24">
    <img
      class="cursor-pointer h-10 md:h-16" alt="CoolPC Logo"
      src="../assets/logo.png"
      @click="navigateToHome"
    />
    <n-menu
      v-if="!isMobile"
      mode="horizontal"
      class="ml-auto justify-end"
      :options="menuOptions"
      @update:value="handleMenuSelect"
      responsive
    />
    <!-- dark/light theme switch -->
    <n-button v-if="!isMobile" @click="changeTheme">
      {{ isDarkTheme ? '淺色模式' : '深色模式' }}
    </n-button>

    <button v-else @click="toggleMobileMenu">
      <n-icon :component="MenuOutline" />
    </button>

    <n-drawer v-model:show="isMobileMenuOpen" placement="right">
      <img
        class="cursor-pointer w-11/12 ml-2 my-10" width="100" alt="CoolPC Logo"
        src="../assets/logo.png"
        @click="navigateToHome"
        />
      <n-menu
        :options="menuOptions"
        mode="vertical"
        @update:value="handleMenuSelect"
      />
      <!-- dark/light theme switch -->
      <n-button class="w-10/12 ml-4 mt-6" @click="changeTheme">
        {{ isDarkTheme ? '淺色模式' : '深色模式' }}
      </n-button>
    </n-drawer>

  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { NIcon } from 'naive-ui'
import { ref, Ref, computed, h, Component } from 'vue'
import { useWindowSize } from '@vueuse/core';
import { ReaderOutline, CartOutline, MenuOutline } from '@vicons/ionicons5'

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

// n-menu options
const router = useRouter();
function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = ref([
  {
    label: '產品列表',
    key: 'product-list',
    link: '/',
    icon: renderIcon(ReaderOutline),
  },
  {
    label: '購物車',
    key: 'shopping-cart',
    link: '/shopping-cart',
    icon: renderIcon(CartOutline),
    
  }
]);
const handleMenuSelect = (key: string) => {
  const selectedOption = menuOptions.value.find(option => option.key === key);
  if (selectedOption) {
    router.push(selectedOption.link);
  }
  isMobileMenuOpen.value = false;
};

</script>