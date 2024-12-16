<template>
  <div id="app">
    <ProductList />
    <ShoppingCart />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'; // Импортируем компонент ProductList
import ShoppingCart from './components/ShoppingCart.vue'; // Импортируем компонент ShoppingCart

export default {
  components: {
    ProductList, // Регистрируем компонент ProductList
    ShoppingCart // Регистрируем компонент ShoppingCart
  }
}
</script>

<style>
/* Ваши стили */
</style>