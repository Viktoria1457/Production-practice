import { createApp } from 'vue'; // Импортируем createApp из Vue
import App from './App.vue'; // Импортируем главный компонент
import store from './store'; // Импортируем Vuex store

const app = createApp(App); // Создаём экземпляр Vue приложения
app.use(store); // Подключаем Vuex
app.mount('#app'); // Монтируем приложение в DOM