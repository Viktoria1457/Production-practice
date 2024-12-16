import { createStore } from 'vuex';

const store = createStore({
  state: {
    products: [],
    cart: [],
    loading: false,
    purchaseHistory: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
      state.loading = false;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    addToCart(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      product.inventory--;
    },
    removeFromCart(state, productId) {
      const productToRemove = state.cart.find(item => item.id === productId);
      if (productToRemove) {
        // Восстанавливаем инвентарь
        const originalProduct = state.products.find(item => item.id === productToRemove.id);
        if (originalProduct) {
          originalProduct.inventory += productToRemove.quantity; // Возвращаем количество на склад
        }
      }
      state.cart = state.cart.filter(item => item.id !== productId); // Удаляем из корзины
    },
    clearCart(state) {
      // Восстанавливаем инвентарь для всех продуктов в корзине
      state.cart.forEach(item => {
        const originalProduct = state.products.find(p => p.id === item.id);
        if (originalProduct) {
          originalProduct.inventory += item.quantity; // Восстанавливаем инвентарь
        }
      });
      state.cart = []; // Очищаем корзину
    },
    addPurchaseHistory(state, purchasedItems) {
      state.purchaseHistory.push(purchasedItems);
    },
  },
  actions: {
    fetchProducts({ commit }) {
      commit('setLoading', true);
      const dummyProducts = [
        { id: 1, title: 'Product 1', price: 100, inventory: 10 },
        { id: 2, title: 'Product 2', price: 150, inventory: 5 },
      ];
      setTimeout(() => {
        commit('setProducts', dummyProducts);
      }, 1000);
    },
    addProductToCart({ commit }, product) {
      commit('addToCart', product);
    },
    checkout({ commit, state }) {
      // Уменьшаем инвентарь товаров в корзине перед оформлением заказа
      state.cart.forEach(cartItem => {
        const originalProduct = state.products.find(p => p.id === cartItem.id);
        if (originalProduct) {
          originalProduct.inventory -= cartItem.quantity; // Уменьшаем инвентарь
        }
      });

      const purchasedItems = state.cart.map(item => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      }));
      
      commit('addPurchaseHistory', purchasedItems);
      commit('clearCart'); // Очищаем корзину после оформления заказа
    }
  },
  getters: {
    availableProducts(state) {
      return state.products.filter(product => product.inventory > 0);
    },
    cartItems(state) {
      return state.cart;
    },
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    purchaseHistory(state) {
      return state.purchaseHistory;
    },
  }
});

export default store;