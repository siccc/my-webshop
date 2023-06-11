<script setup lang="ts">
import NumberInput from '@chenfengyuan/vue-number-input';
import { useProductStore } from '@/stores/products';
import { type CartItem } from '~/types/index';

const productStore = useProductStore();

const props = defineProps<{
  item: CartItem;
}>();
const orderAmount = ref(props.item.amount); // for number input
const product = computed(() => {
  return productStore.getProduct(props.item.productId);
});

const maxOrderAmount = computed(() => {
  return product.value.availableAmount + props.item.amount;
});

const removeItem = (id: string) => {
  productStore.removeFromCart(id);
};

const onUpdate = (value: number) => {
  productStore.updateItemInCart(props.item.productId, value);
};

</script>

<template>
  <article
    class="px-4 py-2 relative sm:flex sm:justify-between sm:items-center"
  >
    <div class="flex items-center flex-wrap">
      <img
        :src="product.img"
        alt=""
        class="w-24 h-16 object-scale-down"
      >
      <div class="ml-4">
        {{ product.name }}
      </div>
    </div>
    <div class="flex justify-between items-center <xs:flex-col gap-4 mt-2 sm:mt-0">
      <NumberInput
        class="w-40"
        :model-value="orderAmount"
        controls
        center
        inline
        :min="product.minOrderAmount"
        :max="maxOrderAmount"
        @update:model-value="onUpdate"
      />
      <div class="font-medium sm:w-32 text-right <xs:w-full <xs:text-center text-xl">
        € {{ props.item.totalPrice }}
      </div>
      <Button
        class="text-slate-400 ml-2 absolute sm:static right-0 top-0"
        type="basic"
        aria-label="Remove item from cart"
        @click="removeItem(props.item.productId)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
          aria-hidden="true"
          focusable="false"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>
    </div>
  </article>
</template>
