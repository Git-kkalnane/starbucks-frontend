// src/utils/storage.js
const STORAGE_KEYS = {
    USER: 'user',
    CART: 'cart',
    STORE: 'selected_store',
    ORDERS: 'active_orders',
    ACCESS_TOKEN: 'accessToken',
};

// Helper functions for localStorage/sessionStorage
export const starbucksStorage = {
    // token
    getAccessToken: () => sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
    setAccessToken: (token) => sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),
    // User data (persistent)
    getUser: () => JSON.parse(sessionStorage.getItem(STORAGE_KEYS.USER) || 'null'),
    setUser: (user) => sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),

    // Cart data (temporary)
    getCart: () => JSON.parse(sessionStorage.getItem(STORAGE_KEYS.CART) || '[]'),
    setCart: (cart) => sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart)),

    // Selected store (persistent)
    getStore: () => JSON.parse(sessionStorage.getItem(STORAGE_KEYS.STORE) || 'null'),
    setStore: (store) => sessionStorage.setItem(STORAGE_KEYS.STORE, JSON.stringify(store)),

    // Active orders (persistent)
    getOrders: () => JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ORDERS) || '[]'),
    setOrders: (orders) => sessionStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders)),

    // Clear all (on logout)
    clearAll: () => {
        // Clear session storage
        sessionStorage.removeItem(STORAGE_KEYS.USER);
        sessionStorage.removeItem(STORAGE_KEYS.STORE);
        sessionStorage.removeItem(STORAGE_KEYS.ORDERS);
        sessionStorage.removeItem(STORAGE_KEYS.CART);

        // Clear access token and refresh tokenW
        starbucksStorage.removeAccessToken();
    },
    removeAccessToken: () => {
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    },
};
