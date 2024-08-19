<template>
  <n-config-provider :theme="isDarkTheme ? darkTheme : lightTheme">
    <n-message-provider placement="bottom-right">
      <n-layout class="min-h-screen flex flex-col">
        <n-layout-header bordered class="fixed z-10 top-0 w-full">
          <Navbar @updateTheme="updateTheme" />
        </n-layout-header>

        <n-layout-content class="flex-grow mt-32 mx-8 mb-4 md:mx-24 md:mb-14 h-full">
          <!-- views -->
          <router-view />
        </n-layout-content>

        <n-layout-footer bordered class="flex mt-auto px-8 py-6 md:px-24 h-full">
          <n-space class="flex gap-8 items-center">
            <img
              class="cursor-pointer h-14 md:h-16" alt="CoolPC Logo"
              src="./assets/logo.png"
            />
            <span>Copyright 2024 Jessica Huang | 7jesstc1999@gmail.com </span>
          </n-space>
        </n-layout-footer>
        
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, lightTheme, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NConfigProvider, NMessageProvider, NSpace } from 'naive-ui'
import { ref, Ref } from 'vue'
import Navbar from './components/Navbar.vue'

let isDarkTheme:Ref<boolean> = ref<boolean>(false);

const updateTheme = (newVal: Ref<boolean>) => {
  isDarkTheme.value = newVal.value;
};
</script>
