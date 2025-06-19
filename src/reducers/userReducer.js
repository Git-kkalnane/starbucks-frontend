// Action types
export const SET_USER = 'SET_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_LOADING = 'SET_LOADING';
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_SELECTED_STORE = 'SET_SELECTED_STORE';
export const ADD_ACTIVE_ORDER = 'ADD_ACTIVE_ORDER';
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';

// 초기 상태를 가져오는 함수
const loadInitialState = () => {
    const storedUser = sessionStorage.getItem('user');

    return {
        isAuthenticated: !!storedUser,
        user: storedUser
            ? JSON.parse(storedUser)
            : {
                  nickname: '',
                  email: '',
                  jwtPath: '',
              },
        loading: false,
        cart: JSON.parse(sessionStorage.getItem('cart') || '[]'),
        selectedStore: JSON.parse(sessionStorage.getItem('selectedStore') || 'null'),
        activeOrders: JSON.parse(sessionStorage.getItem('activeOrders') || '[]'),
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

// Action creators
export const userActions = {
    setLoading: (loading) => ({
        type: SET_LOADING,
        payload: loading,
    }),
    loginSuccess: (user) => ({
        type: LOGIN_SUCCESS,
        payload: { user },
    }),
    logout: () => ({
        type: LOGOUT,
    }),
    setUser: (userData) => ({
        type: SET_USER,
        payload: userData,
    }),
    addToCart: (item) => ({
        type: ADD_TO_CART,
        payload: { item },
    }),
    updateCartItem: (itemId, updates) => ({
        type: UPDATE_CART_ITEM,
        payload: { itemId, updates },
    }),
    removeFromCart: (itemId) => ({
        type: REMOVE_FROM_CART,
        payload: { itemId },
    }),
    clearCart: () => ({
        type: CLEAR_CART,
    }),
    setSelectedStore: (store) => ({
        type: SET_SELECTED_STORE,
        payload: { store },
    }),
    addActiveOrder: (order) => ({
        type: ADD_ACTIVE_ORDER,
        payload: { order },
    }),
    updateOrderStatus: (orderId, status) => ({
        type: UPDATE_ORDER_STATUS,
        payload: { orderId, status },
    }),
};
