<template>
  <n-config-provider :theme="isDarkTheme ? darkTheme : lightTheme">
    <n-layout>
      <n-layout-header>
        <Navbar />
      </n-layout-header>

      <n-layout-content>

        <!-- dark/light theme switch -->
        <n-switch v-model:value="isDarkTheme">
          <template #checked>
            Dark Mode
          </template>
          <template #unchecked>
            Light Mode
          </template>
        </n-switch>

        <!-- view -->
        <router-view />

      </n-layout-content>
      
    </n-layout>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, lightTheme } from 'naive-ui'
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'

let isDarkTheme = ref<boolean>(false);

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
