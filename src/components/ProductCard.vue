<template>
  <n-card class="w-auto h-full">

    <template #cover>
      <img class="w-full object-cover" :src="props.product.imgUrl" @click="showModal = true">
    </template>

    <template #header>
      <h3 @click="showModal = true" class="primary-color">
        {{ props.product.category }}｜{{ props.product.name }}
      </h3>
    </template>

    <template #header-extra>
      <n-tooltip v-if="props.product.openboxUrl" trigger="hover" placement="bottom">
        <template #trigger>
          <n-button strong secondary circle
            tag="a" target="_blank" type="tertiary"
            :href="props.product.openboxUrl">
            <template #icon>
              <n-icon :component="Box" />
            </template>
          </n-button>
        </template>
        開箱討論區
      </n-tooltip>
    </template>

    <template #default>
      <p @click="showModal = true">
        <n-tag :bordered="false">{{ props.product.brand }}</n-tag> &nbsp;
        {{ props.product.description || '' }}
      </p>
    </template>
    
    <template #footer>
      <p class="font-bold primary-color" @click="showModal = true">
        ${{ props.product.price }}
      </p>
    </template>

    <template #action>
      <div class="flex flex-col lg:flex-row lg:justify-between gap-2 w-full">
        <!-- number btn group -->
        <n-input-number class="w-full lg:w-5/12 text-center" 
          button-placement="both"
          :default-value="1"
          min="1" max="100"
          v-model:value="currentCount"
        />
        <!-- add to cart btn -->
        <n-button strong type="primary" class="w-full lg:w-auto px-2" @click="addToCart(props.product, currentCount)">
          <template #icon>
            <n-icon :component="Add" />
          </template>
          加入購物車
        </n-button>
      </div>
    </template>

  </n-card>

  <!-- modal -->
  <n-modal 
    v-model:show="showModal" preset="card" 
    style="width: 80vw;">
    
    <n-flex justify="space-around" class="flex-col md:flex-row w-full">
      <img class="object-scale-down w-full md:w-5/12" :src="props.product.imgUrl">

      <n-flex justify="space-between" vertical class="w-full md:w-6/12">
        <n-flex vertical class="h-full">
          <n-flex justify="space-between">
            <h3 class="primary-color">{{ props.product.category }}｜{{ props.product.name }}</h3>
            <n-flex class="mb-4">
              <n-button strong secondary
                tag="a" target="_blank" type="tertiary"
                :href="props.product.openboxUrl">
                <template #icon>
                  <n-icon :component="Box" />
                </template>
                開箱討論區
              </n-button>
              <n-button strong secondary type="info"
                @click="addToComparedItem(props.product)" >
                <template #icon>
                  <n-icon :component="Compare" />
                </template>
                加入比較
              </n-button>
            </n-flex>
          </n-flex>

          <n-flex vertical>
            <n-tag :bordered="false" class="w-fit">{{ props.product.brand }}</n-tag>
            <p>{{ props.product.description }}</p>
          </n-flex>
        </n-flex>

        <n-flex justify="space-between" class="w-full">
          <p class="font-bold w-fit primary-color">${{ props.product.price }}</p>

          <n-flex justify="end">
            <!-- number btn group -->
            <n-input-number class="w-full md:w-3/12 text-center" 
              button-placement="both"
              :default-value="1"
              min="1" max="100"
              v-model:value="currentCount"
            />
            <!-- add to cart btn -->
            <n-button strong type="primary" class="w-full md:w-auto px-2" @click="addToCart(props.product, currentCount)">
              <template #icon>
                <n-icon :component="Add" />
              </template>
              加入購物車
            </n-button>
          </n-flex>
        </n-flex>
      </n-flex>
    </n-flex>

  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useComparisonStore } from '../stores/comparison';
import { ProductInfo } from '../interfaces/product';
import { NIcon, NCard, NButton, NInputNumber, NTooltip, NTag, NModal, NFlex, useMessage } from 'naive-ui';
import { Box, Compare } from '@vicons/carbon';
import { Add } from '@vicons/ionicons5'

const cartStore = useCartStore();
const comparisonStore = useComparisonStore();

const message = useMessage();

const currentCount = ref(1);
const showModal = ref(false);

interface Props {
  product: ProductInfo,
}
const props = defineProps<Props>();

const addToCart = (product:ProductInfo, count:number) => {
  cartStore.updateItem(product, count, true);
  message.success(`[ ${product.name} ] 已加入購物車`);
}

const addToComparedItem = (product:ProductInfo) => {
  comparisonStore.addComparedItem(product);
  message.info(`[ ${product.name} ] 已加入產品比較`);
}
</script>