<template>
  <div class="product-list">
    <h1>Список товаров</h1>
    <ul v-if="availableProducts.length > 0" class="product-list-items">
      <li v-for="product in availableProducts" :key="product.id" class="product-item">
        <div class="product-info">
          <span class="product-title">{{ product.title }}</span>
          <span class="product-price">{{ product.price }} ₽</span>
          <span class="product-availability" :class="{ 'out-of-stock': product.inventory <= 0 }">Доступно: {{ product.inventory }}</span>
        </div>
        <button 
          @click="addProduct(product)" 
          :disabled="product.inventory <= 0" 
          class="add-to-cart-button"
        >
          Добавить в корзину
        </button>
      </li>
    </ul>
    <p v-else>Нет доступных товаров</p>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="Загрузка..." />
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
  padding: 20px;
  background-color: #f0f4f8; /* Светло-голубой фон */
  border-radius: 10px; /* Закругленные углы у основного контейнера */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Тень для контейнера */
}

h1 {
  font-size: 2em; /* Увеличенный размер заголовка */
  color: #333; /* Темно-серый цвет заголовка */
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
  background-color: #ffffff; /* Фон для каждого товара */
}

.product-item:hover {
  transform: translateY(-5px); /* Эффект подъема */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Тень при наведении */
}

.product-info {
  flex-grow: 1;
}

.product-title {
  font-weight: bold;
  font-size: 1.1em; /* Увеличенный размер шрифта для названия */
}

.product-price {
  font-weight: bold;
  margin-left: 20px;
}

.product-availability {
  margin-left: 10px;
}

.out-of-stock {
  color: red; /* Красный цвет для недоступных товаров */
}

.add-to-cart-button {
  background-color: #007bff; /* Синий цвет для кнопки */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Анимация для кнопки */
}

.add-to-cart-button:disabled {
  background-color: #ccc; /* Серый цвет для заблокированной кнопки */
  cursor: not-allowed; /* Изменение курсора для заблокированной кнопки */
}

.add-to-cart-button:hover {
  background-color: #0056b3; /* Темный оттенок синего при наведении */
  transform: scale(1.05); /* Эффект увеличения при наведении */
}

@media (max-width: 600px) {
  .product-list {
    margin: 10px; /* Уменьшение отступов на маленьких экранах */
  }

  .product-title {
    font-size: 1em; /* Уменьшение размера шрифта на маленьких экранах */
  }

  .add-to-cart-button {
    padding: 8px 12px; /* Уменьшение отступов кнопки на маленьких экранах */
  }
}
</style>