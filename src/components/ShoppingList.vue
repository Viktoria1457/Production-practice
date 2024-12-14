<template>
  <div class="shopping-list">
    <h1>{{ header || 'Welcome' }}</h1>

    <div class="button-container">
      <button class="action-button" v-if="editing" @click="doEdit(false)">Cancel</button>
      <button class="action-button" v-else @click="doEdit(true)">Add Item</button>
    </div>

    <form v-if="editing" @submit.prevent="saveItem">
      <input
        type="text"
        placeholder="Add an Item"
        v-model="newItem"
        @keyup.enter="saveItem"
      />
      <label>
        <input type="checkbox" v-model="newItemHighPriority" />
        High Priority
      </label>
      <button class="action-button" :disabled="newItem.length === 0">Save Item</button>
    </form>

    <label for="filter">Filter:</label>
    <select id="filter" v-model="currentFilter">
      <option value="all">All</option>
      <option value="purchased">Purchased</option>
      <option value="notPurchased">Not Purchased</option>
    </select>

    <div v-if="showPurchasedAlert" class="alert success">
      Nice job! You've bought all your items!
    </div>

    <div v-if="showEmptyListAlert" class="alert info">
      Your shopping list is empty.
    </div>

    <div v-if="showDuplicateAlert" class="alert duplicate">
      Item already exists in the list!
    </div>

    <ul>
      <li
        v-for="item in filteredItems"
        :key="item.id"
        @click="togglePurchased(item)"
        :class="{ priority: item.highPriority }"
      >
        <span :class="{ strikeout: item.purchased }" class="item-label">{{ item.label }}</span>
        <button class="delete-button" @click.stop="removeItem(item)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ShoppingList',
  data() {
    return {
      header: 'Shopping List App',
      editing: false,
      newItem: '',
      newItemHighPriority: false,
      currentFilter: 'all',
      items: [
        { id: 1, label: '10 party hats', purchased: true, highPriority: false },
        { id: 2, label: '2 board games', purchased: true, highPriority: false },
        { id: 3, label: '20 cups', purchased: false, highPriority: true },
      ],
      showPurchasedAlert: false,
      showEmptyListAlert: false,
      showDuplicateAlert: false, // Признак для уведомления о дубликате
    };
  },
  computed: {
    filteredItems() {
      if (this.currentFilter === 'purchased') {
        return this.items.filter(item => item.purchased);
      } else if (this.currentFilter === 'notPurchased') {
        return this.items.filter(item => !item.purchased);
      }
      return this.items; // Все элементы
    },
  },
  methods: {
    saveItem() {
      const existingItem = this.items.find(item => item.label.trim().toLowerCase() === this.newItem.trim().toLowerCase());

      if (existingItem) {
        this.showDuplicateAlert = true; // Показываем ошибку при дубликате
        // Скрываем дубликат через 3 секунды
        setTimeout(() => {
          this.showDuplicateAlert = false;
        }, 3000);
        return; // Прерываем выполнение функции
      }

      if (this.newItem.trim() !== '') {
        this.items.push({
          id: this.items.length + 1,
          label: this.newItem,
          purchased: false,
          highPriority: this.newItemHighPriority,
        });
        this.newItem = '';
        this.newItemHighPriority = false;
        this.checkAlerts();
        this.showDuplicateAlert = false; // Скрываем предупреждение дубликата
      }
    },
    doEdit(editing) {
      this.editing = editing;
      this.newItem = '';
      this.newItemHighPriority = false;
      this.showDuplicateAlert = false; // Скрываем предупреждение при начале редактирования
    },
    togglePurchased(item) {
      item.purchased = !item.purchased;
      this.checkAlerts();
    },
    removeItem(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.checkAlerts();
      }
    },
    checkAlerts() {
      this.showPurchasedAlert = this.items.length > 0 && this.items.every(item => item.purchased);
      this.showEmptyListAlert = this.items.length === 0;

      if (this.showEmptyListAlert) {
        setTimeout(() => {
          this.showEmptyListAlert = false;
        }, 3000);
      }
    },
  },
};
</script>

<style>
.shopping-list {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.alert {
  margin-top: 16px;
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

.info {
  background-color: #cce5ff;
  color: #004085;
}

.duplicate {
  background-color: #fff3cd; /* Желтый фон для дубликата */
  color: #856404; /* Темно-желтый цвет текста */
}

.strikeout {
  text-decoration: line-through;
  color: gray;
}

.priority {
  font-weight: bold;
  color: #ff9800;
}

.label {
  margin-top: 20px;
  font-weight: bold;
}

select {
  margin: 20px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 8px 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.item-label {
  flex-grow: 1; /* Заставляем элемент метки занимать всё доступное пространство */
}

.action-button {
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff; /* Синий цвет для всех общих кнопок */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #0056b3; /* Более темный синий цвет при наведении */
}

.delete-button {
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  background-color: #dc3545; /* Красный цвет для кнопки Delete */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c82333; /* Более темный красный цвет при наведении */
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #007bff; /* Цвет рамки при фокусе */
  outline: none;
}

label {
  display: flex;
  align-items: center;
  font-size: 14px;
}

input[type="checkbox"] {
  margin-right: 5px;
}
</style>