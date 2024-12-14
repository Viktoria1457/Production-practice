// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ShoppingList from '../components/ShoppingList.vue'; // Импортируем компонент

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ShoppingList, // Указываем компонент как домашнюю страницу
  },
  // Вы можете добавить другие маршруты сюда
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;