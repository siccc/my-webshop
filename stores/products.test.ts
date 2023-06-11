import { registerEndpoint } from 'nuxt-vitest/utils';
import { describe, test, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProductStore } from './products';
import { Product } from '~/types/index';

registerEndpoint('/api/products', () => {
  const products: Product[] = [
    {
      id: 'product1',
      name: 'Product 1',
      price: 10,
      availableAmount: 10,
      minOrderAmount: 1,
      img: ''
    },
    {
      id: 'product2',
      name: 'Product 2',
      price: 20,
      availableAmount: 10,
      minOrderAmount: 2,
      img: ''
    },
    {
      id: 'product3',
      name: 'Product 3',
      price: 30,
      availableAmount: 10,
      minOrderAmount: 3,
      img: ''
    }
  ];
  return products;
});

function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

describe('Products Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('init product store', async () => {
    const productStore = useProductStore();
    expect(productStore.loading).toBe(true);
    await flushPromises();

    expect(productStore.products).not.toBe(null);
    expect(productStore.products!.length).toBe(3);
    expect(productStore.products![0].name).toBe('Product 1');
  });

  test('add to cart', async () => {
    const productStore = useProductStore();
    await flushPromises();

    expect(productStore.products![0].availableAmount).toBe(10);
    productStore.addToCart('product1', 1);
    expect(productStore.products![0].availableAmount).toBe(9);
  });

  test('add to cart with invalid amount', async () => {
    const productStore = useProductStore();
    await flushPromises();

    expect(productStore.products![0].availableAmount).toBe(10);
    expect(() => productStore.addToCart('product1', 0)).toThrow();
    expect(() => productStore.addToCart('product1', 11)).toThrow();
  });

  test('remove product from cart', async () => {
    const productStore = useProductStore();
    await flushPromises();

    const product = productStore.products![0];
    expect(product.availableAmount).toBe(10);
    productStore.addToCart('product1', 4);
    expect(product.availableAmount).toBe(6);
    productStore.removeFromCart('product1');
    expect(product.availableAmount).toBe(10);
  });

  test('remove product that does not exist in cart', async () => {
    const productStore = useProductStore();
    await flushPromises();

    expect(() => productStore.removeFromCart('product8')).toThrow();
  });

  test('update product\'s amount in cart', async () => {
    const productStore = useProductStore();
    await flushPromises();

    const product = productStore.products![0];
    expect(product.availableAmount).toBe(10);
    productStore.addToCart('product1', 4);
    expect(product.availableAmount).toBe(6);
    productStore.updateItemInCart('product1', 2);
    expect(product.availableAmount).toBe(8);
  });

  test('get product', async () => {
    const productStore = useProductStore();
    await flushPromises();

    const product = productStore.getProduct('product1');
    expect(product).not.toBe(null);
    expect(product.name).toBe('Product 1');
  });

  test('get product that does not exist', async () => {
    const productStore = useProductStore();
    await flushPromises();

    expect(() => productStore.getProduct('product8')).toThrow();
  });

  test('add to cart with smaller amount than min order amount for the first time', async () => {
    const productStore = useProductStore();
    await flushPromises();

    expect(() => productStore.addToCart('product3', 1)).toThrow();
    expect(() => productStore.addToCart('product3', 3)).not.toThrow();
  });

  test('add to cart with smaller amount than min order amount if the product is already in cart',
    async () => {
      const productStore = useProductStore();
      await flushPromises();

      expect(() => productStore.addToCart('product3', 3)).not.toThrow();
      expect(() => productStore.addToCart('product3', 1)).not.toThrow();
    });

  test('update product\'s amount in cart with smaller amount than min order amount', async () => {
    const productStore = useProductStore();
    await flushPromises();

    expect(() => productStore.addToCart('product3', 3)).not.toThrow();
    expect(() => productStore.updateItemInCart('product3', 1)).toThrow();
  });
});
