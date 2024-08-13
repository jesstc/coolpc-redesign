<template>
  <n-flex justify="space-around"
    class="w-full h-fit py-4 overflow-hidden items-center"
    :style="{ backgroundColor: themeVars.tableColorHover }">
    
    <img v-if="props.isPage" class="w-3/12 h-24 object-scale-down bg-slate-300 items-center"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">

    <n-flex vertical :size="8" class="w-3/12">
      <h3>產品名稱</h3>
      <span v-if="props.isPage" :style="{ color: themeVars.clearColorHover }">
        產品規格：產品規格產品規格產品規格產品規格產品規格
      </span>
    </n-flex>

    <p>$10000</p>

    <!-- number btn group -->
    <n-input-number class="w-1/12 h-fit text-center" 
      button-placement="both"
      :default-value="2"
      min="1" max="100"
    />

    <p v-if="props.isPage">$20000</p>
    
    <!-- add to cart btn -->
    <n-button strong secondary type="error" class="h-fit">
      <template #icon>
        <n-icon><TrashOutline /></n-icon>
      </template>
      <span v-if="props.isPage">刪除</span>
    </n-button>
  </n-flex>
</template>

<script setup lang="ts">
import { NFlex, NButton, NIcon, NInputNumber, useThemeVars } from 'naive-ui'
import { TrashOutline } from '@vicons/ionicons5'
import { defineProps } from 'vue';

const themeVars = useThemeVars();

export interface Props {
  isPage?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isPage: true,
})

</script>