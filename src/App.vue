<template>
  <n-config-provider :theme="isDarkTheme ? darkTheme : lightTheme">
    <n-button @click="changeTheme">嗨你好，我第一次用 naive-uiiii</n-button>
  </n-config-provider>
</template>

<script lang="ts">
import { darkTheme, lightTheme } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    let isDarkTheme = ref<boolean>(true);

    function changeTheme(params:type) {
      isDarkTheme.value = !isDarkTheme.value;
    } 

    return {
      darkTheme,
      lightTheme,
      isDarkTheme,
      changeTheme,
    }
  }
});
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
