import { useFetch } from 'nuxt/app';
import { defineStore } from 'pinia';
import { useCartStore } from './cart';

export const useProductStore = defineStore('products', () => {
  // ------------------------------
  // State
  // ------------------------------

  const cartStore = useCartStore();
  const {
    data: products,
    pending: loading,
    error,
    refresh: refreshProducts
  } = useFetch('/api/products');

  // ------------------------------
  // Methods
  // ------------------------------

  function addToCart(productId: string, amount: number) {
    const product = getProduct(productId);
    const newAvailableAmount = product.availableAmount - amount;
    if (amount === 0 || newAvailableAmount < 0) {
      throw new Error('Invalid amount');
    }
    const item = cartStore.getItem(productId);
    if (!item && amount < product.minOrderAmount) {
      throw new Error('Invalid amount');
    }

    product.availableAmount = newAvailableAmount; // refresh available amount
    cartStore.addItem(product, amount); // add to cart
  }

  function removeFromCart(productId: string) {
    const product = getProduct(productId);

    const amountInCart = cartStore.getItem(productId)?.amount || 0;
    product.availableAmount = product.availableAmount + amountInCart;
    cartStore.removeItem(productId);
  }

  function updateItemInCart(productId: string, newAmount: number) {
    const product = getProduct(productId);

    if (newAmount < product.minOrderAmount) {
      throw new Error('Invalid amount');
    }

    const oldAmountInCart = cartStore.getItem(productId)?.amount || 0;
    const diff = newAmount - oldAmountInCart; // positive if increased, negative if decreased
    product.availableAmount = product.availableAmount - diff;
    cartStore.updateItem(productId, newAmount, product.price);
  }

  function getProduct(productId: string) {
    if (!products.value) {
      throw new Error('Products not loaded');
    }
    const product = products.value.find(p => p.id === productId);
    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }
    return product;
  }

  return {
    products,
    loading,
    error,
    refreshProducts,
    getProduct,
    addToCart,
    removeFromCart,
    updateItemInCart
  };
});
