<template>
  <n-config-provider :theme="isDarkTheme ? darkTheme : lightTheme">
    <n-dialog-provider>
      <n-message-provider placement="bottom-right">
        <n-layout class="min-h-screen flex flex-col">
          <n-layout-header bordered class="fixed z-10 top-0 w-full">
            <Navbar @updateTheme="updateTheme" />
          </n-layout-header>

          <n-layout-content class="flex-grow mt-24 mx-8 mb-4 md:mt-32 md:mx-24 md:mb-14 h-full">
            <!-- views -->
            <router-view />
          </n-layout-content>

        </n-layout>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, lightTheme, NLayout, NLayoutHeader, NLayoutContent, NConfigProvider, NMessageProvider, NDialogProvider } from 'naive-ui'
import { onMounted, ref, Ref } from 'vue'
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue'
import { useProductStore } from './stores/product';

let isDarkTheme:Ref<boolean> = ref<boolean>(false);

const updateTheme = (newVal: Ref<boolean>) => {
  isDarkTheme.value = newVal.value;
};

const productStore = useProductStore();
const router = useRouter();
onMounted(() => {
  router.push({ name: 'ProductList' });
  productStore.fetchProductData();
  productStore.getCategories();
});
</script>
