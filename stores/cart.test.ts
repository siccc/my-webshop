import { describe, test, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from './cart';
import { Product } from '~/types';

const product: Product = {
  id: 'product1',
  name: 'Product 1',
  price: 10,
  availableAmount: 10,
  minOrderAmount: 1,
  img: ''
};

const product2: Product = {
  id: 'product2',
  name: 'Product 2',
  price: 2,
  availableAmount: 10,
  minOrderAmount: 1,
  img: ''
};

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('init cart store', () => {
    const cart = useCartStore();
    expect(cart.items.length).toBe(0);
    expect(cart.itemsCount).toBe(0);
    expect(cart.totalPrice).toBe(0);
  });

  test('add item to cart', () => {
    const cart = useCartStore();
    cart.addItem(product, 2);
    expect(cart.items.length).toBe(1);
    expect(cart.itemsCount).toBe(1);
    expect(cart.totalPrice).toBe(20);
    expect(cart.items[0].amount).toBe(2);
  });

  test('add item to cart that already is in cart', () => {
    const cart = useCartStore();
    cart.addItem(product, 2);
    cart.addItem(product, 3);
    expect(cart.items.length).toBe(1);
    expect(cart.itemsCount).toBe(1);
    expect(cart.totalPrice).toBe(50);
    expect(cart.items[0].amount).toBe(5);
  });

  test('remove item from cart', () => {
    const cart = useCartStore();
    cart.addItem(product, 2);
    cart.removeItem(product.id);
    expect(cart.items.length).toBe(0);
    expect(cart.itemsCount).toBe(0);
    expect(cart.totalPrice).toBe(0);
  });

  test('remove item from cart that is not in cart', () => {
    const cart = useCartStore();
    expect(() => cart.removeItem(product.id)).toThrow();
  });

  test('update item amount', () => {
    const cart = useCartStore();
    cart.addItem(product, 2);
    expect(cart.totalPrice).toBe(20);
    cart.updateItem(product.id, 5, product.price);
    expect(cart.items.length).toBe(1);
    expect(cart.itemsCount).toBe(1);
    expect(cart.totalPrice).toBe(50);
    expect(cart.items[0].amount).toBe(5);
  });

  test('update item that is not in cart', () => {
    const cart = useCartStore();
    expect(() => cart.updateItem(product.id, 5, product.price)).toThrow();
  });

  test('calculate total price', () => {
    const cart = useCartStore();
    cart.addItem(product, 2);
    expect(cart.totalPrice).toBe(20);
    cart.addItem(product2, 3);
    expect(cart.totalPrice).toBe(26);
  });

  test('calculate total items count', () => {
    const cart = useCartStore();
    cart.addItem(product, 2);
    expect(cart.itemsCount).toBe(1);
    cart.addItem(product2, 3);
    expect(cart.itemsCount).toBe(2);
    cart.removeItem(product.id);
    expect(cart.itemsCount).toBe(1);
  });
});
