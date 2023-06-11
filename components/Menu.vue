<template>
  <header class="h-14 w-full bg-indigo-900 flex items-center">
    <nav class="container mx-auto px-4">
      <ul
        class="flex justify-between items-center
        text-white font-medium leading-relaxed space-x-4"
      >
        <li>
          <NuxtLink to="/">
            Products
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/cart" class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5
                14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684
                2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106
                5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0
                11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span>Cart</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
  .router-link-active {
    color: #a5f3fc;
  }
  .router-link-active span {
    border-bottom: 2px solid white;
    border-color: #a5f3fc;
  }
</style>
