<template>
    <n-split :default-size="0.8">
        <template #1>
            <n-menu
                mode="horizontal"
                :options="menuOptions"
                @update:value="handleMenuSelect"
                responsive
            />
        </template>
    </n-split>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { NIcon } from 'naive-ui'
import { ref, h, Component } from 'vue'
import { BookOutline as BookIcon } from '@vicons/ionicons5'

const router = useRouter();

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = ref([
  {
    label: '產品列表',
    key: 'product-list',
    link: '/',
    icon: renderIcon(BookIcon),
  },
  {
    label: '購物車',
    key: 'shopping-cart',
    link: '/shopping-cart',
    icon: renderIcon(BookIcon),
  }
]);

const handleMenuSelect = (key: string) => {
  const selectedOption = menuOptions.value.find(option => option.key === key);
  if (selectedOption) {
    router.push(selectedOption.link);
  }
};

</script>