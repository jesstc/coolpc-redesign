<template>
  <n-config-provider :theme="isDarkTheme ? darkTheme : lightTheme">
    <n-layout>
      <n-layout-header bordered>
        <Navbar @updateTheme="updateTheme" />
      </n-layout-header>

      <n-layout-content class="mx-8 my-4 md:mx-24 md:my-14 h-full">
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
import { darkTheme, lightTheme } from 'naive-ui'
import { ref, Ref } from 'vue'
import Navbar from './components/Navbar.vue'

let isDarkTheme:Ref<boolean> = ref<boolean>(false);

const updateTheme = (newVal: Ref<boolean>) => {
  isDarkTheme.value = newVal.value;
};

</script>
