import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import AuthService from '../services/AuthService';
import { userReducer, initialState, userActions } from '../reducers/userReducer';

const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    // 초기 로드 시 사용자 인증 상태 확인 (한 번만 실행)
    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            try {
                const isValid = await AuthService.validateToken();
                if (isValid) {
                    const user = await AuthService.getCurrentUser();
                    if (isMounted) {
                        dispatch(userActions.loginSuccess(user));
                    }
                } else {
                    if (isMounted) {
                        dispatch(userActions.logout());
                    }
                }
            } catch (error) {
                console.error('인증 확인 실패:', error);
                if (isMounted) {
                    dispatch(userActions.logout());
                }
            } finally {
                if (isMounted) {
                    dispatch(userActions.setLoading(false));
                }
            }
        };

        // 이미 로그인 상태가 아니라면 인증 확인
        if (!state.isAuthenticated) {
            checkAuth();
        } else {
            dispatch(userActions.setLoading(false));
        }

        return () => {
            isMounted = false;
        };
    }, [state.isAuthenticated]); // isAuthenticated가 변경될 때만 실행

    // Action creators
    const login = useCallback(async (email, password) => {
        try {
            dispatch(userActions.setLoading(true));
            const user = await AuthService.login(email, password);
            dispatch(userActions.loginSuccess(user));
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

    const removeFromCart = useCallback((itemId) => {
        dispatch(userActions.removeFromCart(itemId));
    }, []);

    const clearCart = useCallback(() => {
        dispatch(userActions.clearCart());
    }, []);

    const setSelectedStore = useCallback((store) => {
        dispatch(userActions.setSelectedStore(store));
    }, []);

    const addActiveOrder = useCallback((order) => {
        dispatch(userActions.addActiveOrder(order));
    }, []);

    const updateOrderStatus = useCallback((orderId, status) => {
        dispatch(userActions.updateOrderStatus(orderId, status));
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
            addActiveOrder,
            updateOrderStatus,
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
