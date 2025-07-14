import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import AuthService from '../services/AuthService';
import { userReducer, initialState } from '../store/user/userReducer';
import { starbucksStorage } from '../store/starbucksStorage';
import userActions from '../store/user/userActions';
// import { CartQueryService } from '../services/cartService';

const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    // 페이지 로드 시 세션 복원
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const token = starbucksStorage.getAccessToken();
                if (token) {
                    const user = starbucksStorage.getUser();
                    if (user) {
                        dispatch(userActions.loginSuccess(user));

                        // 저장된 장바구니, 매장 정보 복원
                        const cart = starbucksStorage.getCart();
                        const store = starbucksStorage.getStore();
                        const orders = starbucksStorage.getOrders();

                        if (cart) dispatch(userActions.setCart(cart));
                        if (store) dispatch(userActions.setSelectedStore(store));
                    }
                }
            } catch (error) {
                console.error('세션 복원 중 오류 발생:', error);
                dispatch(userActions.logout());
            }
        };

        restoreSession();
    }, []);

    // Action creators
    const login = useCallback(async (email, password) => {
        try {
            dispatch(userActions.setLoading(true));
            const user = await AuthService.login(email, password);
            // 로그인 성공시 userContext에 정보 저장
            dispatch(userActions.loginSuccess(user));

            // const cartItems = await CartQueryService.getCartItems();
            console.log('Cart items:', cartItems);
            dispatch(userActions.setCart(cartItems));
            return true;
        } catch (error) {
            console.error('로그인 실패:', error);
            dispatch(userActions.logout());
            throw error;
        } finally {
            dispatch(userActions.setLoading(false));
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await AuthService.logout();
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        } finally {
            dispatch(userActions.logout());
        }
    }, []);

    const setUser = useCallback((userData) => {
        dispatch(userActions.setUser(userData));
    }, []);

    const addToCart = useCallback((item) => {
        dispatch(userActions.addToCart(item));
    }, []);

    const updateCartItem = useCallback((itemId, updates) => {
        dispatch(userActions.updateCartItem(itemId, updates));
    }, []);

    const removeFromCart = useCallback((itemIdOrIds) => {
        dispatch(userActions.removeFromCart(itemIdOrIds));
    }, []);

    const clearCart = useCallback(() => {
        dispatch(userActions.clearCart());
    }, []);

    const setSelectedStore = useCallback((store) => {
        dispatch(userActions.setSelectedStore(store));
    }, []);

    const setActiveOrders = useCallback((orders) => {
        console.log('UserContext setActiveOrders: ', orders);
        dispatch(userActions.setActiveOrders(orders));
    }, []);

    // Value object
    const value = {
        state,
        actions: {
            login,
            logout,
            setUser,
            addToCart,
            updateCartItem,
            removeFromCart,
            clearCart,
            setSelectedStore,
            setActiveOrders,
        },
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
