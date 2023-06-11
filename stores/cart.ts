import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { type CartItem, type Product } from '~/types/index';

export const useCartStore = defineStore('cart', () => {
  // ------------------------------
  // State
  // ------------------------------

  const items = ref<CartItem[]>([]);
  const itemsCount = computed(() => items.value.length);
  const totalPrice = computed(() => {
    const sum = items.value.reduce((total, item) => total + item.totalPrice, 0);
    return round(sum);
  });

  // ------------------------------
  // Methods
  // ------------------------------

  function addItem(product: Product, amount: number) {
    const item = items.value.find(i => i.productId === product.id);
    // if item already exists, update amount and totalPrice
    if (item) {
      item.amount = item.amount + amount;
      item.totalPrice = round(item.amount * product.price);
    } else { // otherwise, add new item
      items.value.push({
        productId: product.id,
        amount,
        totalPrice: round(amount * product.price)
      });
    }
  }

  function removeItem(productId: string) {
    const item = findItemOrThrow(productId);
    items.value.splice(items.value.indexOf(item), 1);
  }

  function updateItem(productId: string, newAmount: number, price: number) {
    const item = findItemOrThrow(productId);
    item.amount = newAmount;
    item.totalPrice = round(newAmount * price);
  }

  function getItem(productId: string) {
    return items.value.find(i => i.productId === productId);
  }

  // ------------------------------
  // Helpers
  // ------------------------------

  function findItemOrThrow(id: string) {
    const item = items.value.find(i => i.productId === id);
    if (!item) {
      throw new Error(`Item with id ${id} not found in cart`);
    }
    return item;
  }

  function round(value: number) {
    return Number(value.toFixed(2));
  }

  return { items, totalPrice, itemsCount, addItem, removeItem, updateItem, getItem };
});
