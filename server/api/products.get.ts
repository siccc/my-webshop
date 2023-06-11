import { type Product } from '~/types/index';

const url = 'https://cas5-0-urlprotect.trendmicro.com:443/wis/clicktime/v1/query?url=https%3a%2f%2f63c10327716562671870f959.mockapi.io%2fproducts&umid=edab3d48-7a50-4ca6-b6c9-9362af456f60&auth=3bd1ed0ea25e030aebac2180cda48b2d7a1ccc30-bf53e959aa381ef3b79ace2237ee4d9545bb0e5b';

export default defineEventHandler(async (): Promise<Product[]> => {
  const data = await $fetch(url);
  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error('Invalid data received from API');
  }
  return data;
});

// In real-life projects I would use a library like zod to validate the data.
function isProduct(product: any): product is Product {
  return (
    typeof product === 'object' && product !== null &&
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.img === 'string' &&
    typeof product.availableAmount === 'number' &&
    typeof product.minOrderAmount === 'number'
  );
}
