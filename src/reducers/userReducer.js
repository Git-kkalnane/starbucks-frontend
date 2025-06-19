import { starbucksStorage } from '../_utils/starbucksStorage';

// Action types
export const SET_USER = 'SET_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_LOADING = 'SET_LOADING';
export const ADD_TO_CART = 'ADD_TO_CART';
export const SET_CART = 'SET_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_SELECTED_STORE = 'SET_SELECTED_STORE';
export const ADD_ACTIVE_ORDER = 'ADD_ACTIVE_ORDER';
export const SET_ACTIVE_ORDERS = 'SET_ACTIVE_ORDERS';
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';

// 초기 상태를 가져오는 함수
const loadInitialState = () => {
    const storedUser = starbucksStorage.getUser();

    return {
        isAuthenticated: !!storedUser,
        user: storedUser
            ? storedUser.user
            : {
                  nickname: '',
                  email: '',
              },
        loading: false,
        cart: starbucksStorage.getCart() || [],
        selectedStore: starbucksStorage.getStore() || null,
        activeOrders: starbucksStorage.getOrders() || [],
    };
};

// Initial state
export const initialState = loadInitialState();
// Reducer function
export const userReducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                loading: false,
            };

        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
                cart: [],
            };

        case SET_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };

        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload.item],
            };

        case UPDATE_CART_ITEM:
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === action.payload.itemId ? { ...item, ...action.payload.updates } : item,
                ),
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload.itemId),
            };

        case CLEAR_CART:
            return {
                ...state,
                cart: [],
            };

        case SET_SELECTED_STORE:
            return {
                ...state,
                selectedStore: action.payload.store,
            };

        case ADD_ACTIVE_ORDER:
            return {
                ...state,
                activeOrders: [...state.activeOrders, action.payload.order],
            };

        case UPDATE_ORDER_STATUS:
            return {
                ...state,
                activeOrders: state.activeOrders.map((order) =>
                    order.id === action.payload.orderId ? { ...order, status: action.payload.status } : order,
                ),
            };

        default:
            return state;
    }
};

// Validation helpers
const validateLoading = (loading) => {
    if (typeof loading !== 'boolean') {
        console.error('Invalid loading value:', loading);
        return false;
    }
    return true;
};

const validateUser = (user) => {
    if (!user || typeof user !== 'object') {
        console.error('Invalid user data:', user);
        return false;
    }
    const requiredFields = ['email', 'nickname'];
    return requiredFields.every((field) => field in user && typeof user[field] === 'string');
};

const validateCartItem = (item) => {
    if (!item || typeof item !== 'object') return false;
    return (
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        typeof item.quantity === 'number'
    );
};

const validateStore = (store) => {
    if (!store) return false;
    // TODO 필드명 꼭 챙겨 보기
    return typeof store === 'object' && typeof store.storeId === 'string' && typeof store.name === 'string';
};

const validateOrder = (order) => {
    if (!order || typeof order !== 'object') return false;
    return (
        typeof order.id === 'string' &&
        Array.isArray(order.items) &&
        order.items.every(validateCartItem) &&
        typeof order.total === 'number' &&
        ['pending', 'preparing', 'ready', 'completed', 'cancelled'].includes(order.status)
    );
};

// Action creators with validation
export const userActions = {
    setLoading: (loading) => {
        if (!validateLoading(loading)) {
            console.warn('Invalid loading value in setLoading');
            return { type: SET_LOADING, payload: false };
        }
        return {
            type: SET_LOADING,
            payload: loading,
        };
    },

    loginSuccess: (user) => {
        if (!validateUser(user)) {
            console.warn(`${userActions.loginSuccess.name} ${user} loginSuccess`);
            return { type: LOGIN_SUCCESS, payload: { user: user } };
        }
        return {
            type: LOGIN_SUCCESS,
            payload: { user },
        };
    },

    logout: () => ({
        type: LOGOUT,
    }),

    setUser: (userData) => {
        if (!validateUser(userData)) {
            console.warn('Invalid user data in setUser');
            return { type: SET_USER, payload: {} };
        }
        return {
            type: SET_USER,
            payload: userData,
        };
    },

    addToCart: (item) => {
        if (!validateCartItem(item)) {
            console.warn('Invalid cart item in addToCart');
            return { type: ADD_TO_CART, payload: { item: null } };
        }
        return {
            type: ADD_TO_CART,
            payload: { item },
        };
    },

    setCart: (cart) => {
        if (!Array.isArray(cart) || !cart.every(validateCartItem)) {
            console.warn('Invalid cart data in setCart');
            return { type: SET_CART, payload: { cart: [] } };
        }
        return {
            type: SET_CART,
            payload: { cart },
        };
    },

    updateCartItem: (itemId, updates) => {
        if (typeof itemId !== 'string' || !updates || typeof updates !== 'object') {
            console.warn('Invalid parameters in updateCartItem');
            return { type: UPDATE_CART_ITEM, payload: { itemId: '', updates: {} } };
        }
        return {
            type: UPDATE_CART_ITEM,
            payload: { itemId, updates },
        };
    },

    removeFromCart: (itemId) => {
        if (typeof itemId !== 'string') {
            console.warn('Invalid itemId in removeFromCart');
            return { type: REMOVE_FROM_CART, payload: { itemId: '' } };
        }
        return {
            type: REMOVE_FROM_CART,
            payload: { itemId },
        };
    },

    clearCart: () => ({
        type: CLEAR_CART,
    }),

    setSelectedStore: (store) => {
        if (!validateStore(store)) {
            console.warn('Invalid store data in setSelectedStore');
            return { type: SET_SELECTED_STORE, payload: { store: null } };
        }
        return {
            type: SET_SELECTED_STORE,
            payload: { store },
        };
    },

    addActiveOrder: (order) => {
        if (!validateOrder(order)) {
            console.warn('Invalid order data in addActiveOrder');
            return { type: ADD_ACTIVE_ORDER, payload: { order: null } };
        }
        return {
            type: ADD_ACTIVE_ORDER,
            payload: { order },
        };
    },

    setActiveOrders: (orders) => {
        if (!Array.isArray(orders) || !orders.every(validateOrder)) {
            console.warn('Invalid orders data in setActiveOrders');
            return { type: SET_ACTIVE_ORDERS, payload: { orders: [] } };
        }
        return {
            type: SET_ACTIVE_ORDERS,
            payload: { orders },
        };
    },

    updateOrderStatus: (orderId, status) => {
        if (
            typeof orderId !== 'string' ||
            !['pending', 'preparing', 'ready', 'completed', 'cancelled'].includes(status)
        ) {
            console.warn('Invalid order status update');
            return { type: UPDATE_ORDER_STATUS, payload: { orderId: '', status: 'pending' } };
        }
        return {
            type: UPDATE_ORDER_STATUS,
            payload: { orderId, status },
        };
    },
};
