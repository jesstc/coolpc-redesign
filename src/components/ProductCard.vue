<template>
  <n-card title="產品名稱" class="w-72">
    <template #cover>
      <img class="w-full h-full object-cover"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
    </template>

    <template #header-extra>
      <n-tooltip trigger="hover" placement="bottom">
        <template #trigger>
          <n-button strong secondary circle>
            <template #icon>
              <n-icon><Box /></n-icon>
            </template>
          </n-button>
        </template>
        開箱影片
      </n-tooltip>
    </template>
    簡要說明簡要說明簡要說明簡要說明簡要說明簡要說明簡要說明簡要說明簡要說明簡要說明簡要說明簡要說明簡要說明簡要說明
    
    <template #footer>
      <div class="text-right">$price</div>
    </template>

    <template #action>
      <div class="flex flex-col lg:flex-row lg:justify-between gap-2 w-full">
        <!-- number btn group -->
        <n-input-number class="w-full lg:w-5/12 text-center" 
          button-placement="both"
          :default-value="0"
          min="0" max="100"
        />
        <!-- add to cart btn -->
        <n-button strong secondary type="primary" class="w-full lg:w-auto px-2">
          <template #icon>
            <n-icon><Add /></n-icon>
          </template>
          加入購物車
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { NIcon, NCard, NButton, NInputNumber, NTooltip } from 'naive-ui'
import { ref, Ref, computed, h, Component } from 'vue'
import { Box } from '@vicons/carbon'
import { Add, Remove } from '@vicons/ionicons5'

export interface ProductInfo {
  readonly id: number,
  name: string,
  imgUrl: string,
  price: number,
  brand: string,
  category: string,
  description?: string,
  openboxUrl?: string,
};
</script>