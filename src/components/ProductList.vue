<template>
  <div class="product-list">
    <h1>Product List</h1>
    <ul v-if="availableProducts.length > 0" class="product-list-items">
      <li v-for="product in availableProducts" :key="product.id" class="product-item">
        <div class="product-info">
          <span class="product-title">{{ product.title }}</span>
          <span class="product-price">${{ product.price }}</span>
          <span class="product-availability" :class="{ 'out-of-stock': product.inventory <= 0 }">Available: {{ product.inventory }}</span>
        </div>
        <button 
          @click="addProduct(product)" 
          :disabled="product.inventory <= 0" 
          class="add-to-cart-button"
        >
          Add to Cart
        </button>
      </li>
    </ul>
    <p v-else>No products available</p>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="Loading..." />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['availableProducts', 'loading']),
  },
  created() {
    this.$store.dispatch('fetchProducts');
  },
  methods: {
    addProduct(product) {
      this.$store.dispatch('addProductToCart', product);
    }
  }
}
</script>

<style scoped>
.product-list {
  text-align: center;
  margin: 20px;
}
.product-list-items {
  padding: 0; /* Убираем отступы для списка */
  list-style-type: none; /* Убираем маркеры списка */
}
.product-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px 0;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s; /* Анимация при наведении */
}
.product-item:hover {
  transform: translateY(-5px); /* Эффект подъема */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Тень при наведении */
}
.product-info {
  flex-grow: 1;
}
.product-title {
  font-weight: bold;
}
.product-price {
  font-weight: bold;
  margin-left: 20px;
}
.product-availability {
  margin-left: 10px;
}
.out-of-stock {
  color: red;
}
.add-to-cart-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.add-to-cart-button:hover {
  background-color: #45a049;
}
</style>