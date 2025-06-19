import { validateLoading, validateUser, validateCartItem, validateStore, validateOrder } from '../_utils/validators';
import {
    SET_LOADING,
    SET_USER,
    ADD_TO_CART,
    SET_CART,
    UPDATE_CART_ITEM,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SET_SELECTED_STORE,
    ADD_ACTIVE_ORDER,
    SET_ACTIVE_ORDERS,
    UPDATE_ORDER_STATUS,
    LOGIN_SUCCESS,
    LOGOUT,
} from '../constants/actionTypes';

// Individual exports
export const setLoading = (loading) => {
    if (!validateLoading(loading)) {
        console.error('Invalid loading state');
        return { type: SET_LOADING, payload: false };
    }
    return { type: SET_LOADING, payload: loading };
};

export const loginSuccess = (user) => {
    if (!validateUser(user)) {
        console.warn(`${userActions.loginSuccess.name} ${user} loginSuccess`);
        return { type: LOGIN_SUCCESS, payload: { user: user } };
    }
    return {
        type: LOGIN_SUCCESS,
        payload: { user },
    };
};

export const logout = () => ({
    type: LOGOUT,
});

export const setUser = (userData) => {
    if (!validateUser(userData)) {
        console.error('Invalid user data');
        return { type: SET_USER, payload: null };
    }
    return { type: SET_USER, payload: userData };
};

export const addToCart = (item) => {
    if (!validateCartItem(item)) {
        console.error('Invalid cart item');
        return { type: ADD_TO_CART, payload: null };
    }
    return { type: ADD_TO_CART, payload: { item } };
};

export const setCart = (cart) => {
    if (!Array.isArray(cart) || !cart.every(validateCartItem)) {
        console.error('Invalid cart');
        return { type: SET_CART, payload: [] };
    }
    return { type: SET_CART, payload: cart };
};

export const updateCartItem = (itemId, updates) => ({
    type: UPDATE_CART_ITEM,
    payload: { itemId, updates },
});

export const removeFromCart = (itemId) => ({
    type: REMOVE_FROM_CART,
    payload: itemId,
});

export const clearCart = () => ({
    type: CLEAR_CART,
});

export const setSelectedStore = (store) => {
    if (!validateStore(store)) {
        console.error('Invalid store data');
        return { type: SET_SELECTED_STORE, payload: null };
    }
    console.log('userActions.js setSelectedStore', store.name);
    return { type: SET_SELECTED_STORE, payload: { store } };
};

export const addActiveOrder = (order) => {
    if (!validateOrder(order)) {
        console.error('Invalid order data');
        return { type: ADD_ACTIVE_ORDER, payload: null };
    }
    return { type: ADD_ACTIVE_ORDER, payload: order };
};

export const setActiveOrders = (orders) => {
    if (!Array.isArray(orders) || !orders.every(validateOrder)) {
        console.error('Invalid orders data');
        return { type: SET_ACTIVE_ORDERS, payload: [] };
    }
    return { type: SET_ACTIVE_ORDERS, payload: orders };
};

export const updateOrderStatus = (orderId, status) => ({
    type: UPDATE_ORDER_STATUS,
    payload: { orderId, status },
});

// Export as default object for convenience
const userActions = {
    setLoading,
    setUser,
    addToCart,
    loginSuccess,
    logout,
    setCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    setSelectedStore,
    addActiveOrder,
    setActiveOrders,
    updateOrderStatus,
};

export default userActions;
