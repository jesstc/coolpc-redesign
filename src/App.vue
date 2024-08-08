<template>
  <n-config-provider :theme="isDarkTheme ? darkTheme : lightTheme">
    <n-layout>
      <n-layout-header>
        <Navbar @updateTheme="updateTheme" />
      </n-layout-header>

      <n-layout-content>
        <!-- view -->
        <router-view />

      </n-layout-content>
      
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
