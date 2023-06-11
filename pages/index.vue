<script setup lang="ts">
import { useProductStore } from '@/stores/products';

const productStore = useProductStore();

</script>
<template>
  <main class="container mx-auto p-4 my-4">
    <Button
      class="mb-8"
      type="primary"
      :disabled="productStore.loading"
      @click="productStore.refreshProducts()"
    >
      Refresh product list
    </Button>
    <div v-if="productStore.loading">
      Loading ...
    </div>
    <div
      v-else
      class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
    >
      <div
        v-for="product in productStore.products"
        :key="product.id"
        class=""
      >
        <Product :product="product" />
      </div>
    </div>
    <!-- EMPTY STATE -->
    <div v-if="productStore.products?.length === 0">
      No products found.
    </div>
  </main>
</template>
