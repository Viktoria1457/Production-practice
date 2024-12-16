<template>
  <div class="shopping-cart">
    <h1>Shopping Cart</h1>
    <ul v-if="cartItems.length > 0" class="cart-list">
      <li v-for="item in cartItems" :key="item.id" class="cart-item">
        <span>{{ item.title }} - ${{ item.price }} x {{ item.quantity }}</span>
        <button class="remove-button" @click="removeFromCart(item.id)">X</button>
      </li>
    </ul>
    <p v-else>Your cart is empty.</p>
    <p>Total: ${{ cartTotal }}</p>
    <button @click="checkout" v-if="cartItems.length > 0" class="checkout-button">Checkout</button>

    <h2>Purchase History</h2>
    <ul class="purchase-history">
      <li 
        v-for="(purchase, index) in purchaseHistory" 
        :key="index" 
        class="purchase-item"
      >
        <div class="purchase-header">
          <strong>Purchase {{ index + 1 }}:</strong>
          <div class="purchase-line"></div> <!-- Вертикальная линия -->
        </div>
        <ul class="purchase-details"> <!-- Добавлено для применения стилей -->
          <li v-for="(item, itemIndex) in purchase" :key="itemIndex">
            {{ item.title }} - Quantity: {{ item.quantity }} - Price: ${{ item.price }}
          </li>
          <li>
            <strong>Total: ${{ calculatePurchaseTotal(purchase) }}</strong>
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
  text-align: center; /* Выравнивание текста по центру */
}
.cart-list, .purchase-history {
  padding: 0; /* Убираем отступы для списка */
  list-style-type: none; /* Убираем маркеры списка */
}
.cart-item, .purchase-item {
  margin: 10px 0; /* Отступы между элементами списка */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc; /* Граница для элементов списка */
  border-radius: 8px; /* Закругленные углы */
  transition: transform 0.2s, box-shadow 0.2s;
}
.cart-item:hover, .purchase-item:hover {
  transform: translateY(-3px); /* Эффект подъема */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Тень при наведении */
}
.remove-button {
  background-color: red; /* Красный цвет для удаления */
  color: white; /* Белый текст */
  border: none; /* Без рамки */
  border-radius: 5px; /* Закругленные углы */
  padding: 5px 10px; /* Отступы */
  cursor: pointer; /* Указатель при наведении */
  transition: background-color 0.3s; /* Анимация изменения фона */
}
.remove-button:hover {
  background-color: darkred; /* Темный красный при наведении */
}
.checkout-button {
  background-color: #008CBA; /* Синий фон для кнопки оформления */
  color: white; /* Белый текст */
  border: none; /* Без рамки */
  border-radius: 5px; /* Закругленные углы */
  padding: 10px 15px; /* Отступы */
  cursor: pointer; /* Указатель при наведении */
  transition: background-color 0.3s; /* Анимация изменения фона */
}
.checkout-button:hover {
  background-color: #005f73; /* Темно-синий при наведении */
}
.purchase-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.purchase-line {
  width: 2px; /* Ширина линии */
  height: 30px; /* Высота линии */
  background-color: #ccc; /* Цвет линии */
  margin-left: 10px; /* Отступ от текста */
}
.purchase-details {
  padding-left: 20px; /* Отступ для вложенного списка */
}
</style>