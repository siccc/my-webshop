<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

</script>

<template>
  <main class="container mx-auto p-4">
    <h1 class="text-xl font-medium mb-4">
      Shopping cart
    </h1>
    <div v-if="cartStore.itemsCount > 0" class="md:flex md:items-start">
      <!-- CART ITEMS -->
      <div
        class="flex flex-col md:flex-1 border-2 border-slate-200 rounded
          divide-y-2 divide-slate-200"
      >
        <div v-for="item in cartStore.items" :key="item.productId">
          <CartItem :item="item" />
        </div>
      </div>
      <!-- ORDER SUMMARY -->
      <section class="bg-slate-100 rounded px-4 py-4 md:w-96 md:ml-8 md:mt-0 mt-4">
        <div class="flex justify-between mb-2">
          <span>Order summary:</span>
          <span>
            <span>{{ cartStore.itemsCount }}</span>
            {{ cartStore.itemsCount > 1 ? 'items' : 'item' }}
          </span>
        </div>
        <div class="text-xl flex justify-between font-medium">
          <span> Total price:</span>
          <span> € {{ cartStore.totalPrice }}</span>
        </div>
        <div class="flex flex-col items-center mt-4">
          <Button type="primary" class="mt-4 w-full">
            Checkout
          </Button>
          <NuxtLink class="mt-4 hover:border-b hover:border-black" to="/">
            Continue shopping
          </NuxtLink>
        </div>
      </section>
    </div>
    <!-- EMPTY STATE -->
    <div v-else>
      Your cart is currently empty.
    </div>
  </main>
</template>
