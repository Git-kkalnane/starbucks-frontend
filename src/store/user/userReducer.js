import { starbucksStorage } from '../starbucksStorage';

import {
    SET_LOADING,
    SET_USER,
    ADD_TO_CART,
    UPDATE_CART_ITEM,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SET_SELECTED_STORE,
    ADD_ACTIVE_ORDER,
    SET_ACTIVE_ORDERS,
    UPDATE_ORDER_STATUS,
    LOGIN_SUCCESS,
    LOGOUT,
} from '../../_utils/constants/actionTypes';

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
            // Handle case where payload might be null or invalid
            if (!action.payload || !action.payload.item) {
                console.error('Invalid cart item in ADD_TO_CART:', action.payload);
                return state;
            }
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

        case REMOVE_FROM_CART: {
            const itemIds = action.payload.itemIds;
            return {
                ...state,
                cart: state.cart.filter((item) => !itemIds.includes(item.id)),
            };
        }

        case CLEAR_CART:
            return {
                ...state,
                cart: [],
            };

        case SET_SELECTED_STORE:
            // console.log('userReducer setSelectedStore', action.payload);
            return {
                ...state,
                selectedStore: action.payload.store,
            };

        case SET_ACTIVE_ORDERS:
            return {
                ...state,
                activeOrders: action.payload,
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
