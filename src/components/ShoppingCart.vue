<template>
  <div class="shopping-cart">
    <h1>Корзина</h1>
    <ul v-if="cartItems.length > 0" class="cart-list">
      <li v-for="item in cartItems" :key="item.id" class="cart-item">
        <span>{{ item.title }} - {{ item.price }} ₽ x {{ item.quantity }}</span>
        <button class="remove-button" @click="removeFromCart(item.id)">Удалить</button>
      </li>
    </ul>
    <p v-else>Ваша корзина пуста.</p>
    <p><strong>Итог: {{ cartTotal }} ₽</strong></p>
    <button @click="checkout" v-if="cartItems.length > 0" class="checkout-button">Оформить заказ</button>

    <h2>История покупок</h2>
    <ul class="purchase-history">
      <li 
        v-for="(purchase, index) in purchaseHistory" 
        :key="index" 
        class="purchase-item"
      >
        <div class="purchase-header">
          <strong>Покупка {{ index + 1 }}:</strong>
          <div class="purchase-line"></div>
        </div>
        <ul class="purchase-details">
          <li v-for="(item, itemIndex) in purchase" :key="itemIndex">
            {{ item.title }} - Количество: {{ item.quantity }} - Цена: {{ item.price }} ₽
          </li>
          <li>
            <strong>Итог: {{ calculatePurchaseTotal(purchase) }} ₽</strong>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItems', 'cartTotal', 'purchaseHistory']),
  },
  methods: {
    removeFromCart(productId) {
      this.$store.commit('removeFromCart', productId);
    },
    checkout() {
      this.$store.dispatch('checkout');
    },
    calculatePurchaseTotal(purchase) {
      return purchase.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  }
}
</script>

<style scoped>
.shopping-cart {
  text-align: center;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9; /* Светло-серый фон */
  border-radius: 10px; /* Закругленные углы контейнера */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Тень для контейнера */
  max-width: 600px; /* Максимальная ширина контейнера */
}

h1 {
  font-size: 2em; /* Увеличенный размер заголовка */
  color: #333; /* Темно-серый цвет заголовка */
}

.cart-list, .purchase-history {
  padding: 0;
  list-style-type: none;
}

.cart-item, .purchase-item {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: #ffffff; /* Фон для каждого элемента */
}

.cart-item:hover, .purchase-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.remove-button {
  background-color: #dc3545; /* Красный цвет для удаления */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #c82333; /* Более темный красный при наведении */
}

.checkout-button {
  background-color: #007bff; /* Синий фон для кнопки оформления */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px; /* Отступ над кнопкой оформления */
}

.checkout-button:hover {
  background-color: #0056b3; /* Темный синий при наведении */
}

.purchase-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.purchase-line {
  width: 2px;
  height: 30px;
  background-color: #ccc;
  margin-left: 10px;
}

.purchase-details {
  padding-left: 20px;
}

@media (max-width: 600px) {
  .shopping-cart {
    padding: 10px; /* Меньше отступов на мобильных устройствах */
    margin: 10px; /* Меньше отступов на мобильных устройствах */
  }

  h1 {
    font-size: 1.5em; /* Меньше заголовок на маленьких экранах */
  }

  .remove-button, .checkout-button {
    padding: 8px 10px; /* Меньше отступы для кнопок на мобильных устройствах */
  }
}
</style>