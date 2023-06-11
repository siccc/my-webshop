<script setup lang="ts">
import NumberInput from '@chenfengyuan/vue-number-input';
import { useProductStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { type Product } from '~/types/index';

const productStore = useProductStore();
const cartStore = useCartStore();

const props = defineProps<{
  product: Product;
}>();
const minOrderAmount = computed(() => {
  const productInCart = cartStore.getItem(props.product.id);
  if (!productInCart) { // there is no item in cart, so minOrderAmount is product.minOrderAmount
    return props.product.minOrderAmount;
  } else { // there is already min amount item in the cart, so minOrderAmount can be 1
    return props.product.availableAmount === 0 ? 0 : 1;
  }
});
const orderAmount = ref(minOrderAmount.value); // for number input
const unavailable = computed(() => props.product.availableAmount === 0);

const addToCart = () => {
  productStore.addToCart(props.product.id, orderAmount.value);
  // reset orderAmount
  orderAmount.value = minOrderAmount.value;
};

</script>

<template>
  <article
    class="p-4 border-2 border-slate-200 rounded
    hover:shadow-xl hover:shadow-indigo-400/20 hover:transition
    hover:border-indigo-300 cursor-pointer"
  >
    <img
      :src="props.product.img"
      :alt="props.product.name"
      class="w-full h-48 p-4 object-scale-down"
      :class="{
        'opacity-50': unavailable
      }"
    >
    <div class="text-center text-indigo-600">
      {{ props.product.name }}
    </div>
    <div class="text-center mt-2">
      € <span class="font-medium text-xl">{{ props.product.price }}</span>
    </div>
    <div class="mt-4 flex items-center flex-wrap gap-4">
      <NumberInput
        v-model="orderAmount"
        controls
        center
        size="small"
        :min="minOrderAmount"
        :max="product.availableAmount"
        :disabled="unavailable"
        class="flex-auto"
      />
      <Button
        class="flex-auto"
        :disabled="unavailable"
        type="primary"
        aria-label="Remove item from cart"
        @click="addToCart()"
      >
        {{ unavailable ? 'Sold out' : 'Add to cart' }}
      </Button>
    </div>
    <div class="text-slate-400 text-xs mt-2">
      Available: {{ product.availableAmount }}
    </div>
  </article>
</template>
