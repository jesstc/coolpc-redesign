<template>
  <n-flex justify="space-between" class="w-full h-24 overflow-hidden items-center">
    <img v-if="props.isPage" class="w-3/12 h-full object-scale-down bg-slate-300 items-center"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">

    <n-flex vertical class="w-3/12">
      <h3>產品名稱</h3>
      <p v-if="props.isPage">產品規格：產品規格產品規格產品規格產品規格產品規格產品規格產品規格產品規格產品規格產品規格</p>
    </n-flex>

    <p>$單價</p>

    <!-- number btn group -->
    <n-input-number class="w-1/12 h-fit text-center" 
      button-placement="both"
      :default-value="0"
      min="0" max="100"
    />

    <p v-if="props.isPage">$總價</p>
    
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
import { NFlex, NButton, NIcon, NInputNumber } from 'naive-ui'
import { TrashOutline } from '@vicons/ionicons5'
import { defineProps } from 'vue';

export interface Props {
  isPage?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isPage: true,
})

</script>