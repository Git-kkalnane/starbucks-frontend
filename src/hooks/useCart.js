import { useCallback } from 'react';
import { starbucksStorage } from '../store/starbucksStorage';

/**
 * 장바구니 관련 작업을 위한 커스텀 훅
 * @param {Object} menuItem - 설정 중인 메뉴 아이템
 * @param {Object} options - 설정 옵션들
 * @param {string} options.cupSize - 선택된 컵 사이즈
 * @param {Array} options.availableCupSizes - 사용 가능한 컵 사이즈 목록
 * @param {Function} options.calculateCupSizePrice - 컵 사이즈에 따른 가격 계산 함수
 * @param {Object} options.options - 선택된 옵션들
 * @param {Function} options.calculateOptionsTotal - 옵션 총 가격 계산 함수
 * @param {number} options.quantity - 선택된 수량
 * @param {Function} options.calculateTotal - 총 가격 계산 함수
 * @returns {Object} 장바구니 관련 함수들
 */
export const useCart = (
    menuItem,
    {
        cupSize,
        availableCupSizes,
        calculateCupSizePrice,
        options,
        calculateOptionsTotal,
        quantity,
        calculateTotal,
    },
) => {
    /**
     * 구성된 아이템을 장바구니에 추가합니다.
     * @param {Function} addToCart - 전역 상태에 아이템을 추가하는 함수
     * @param {string} currentImg - 아이템 이미지 URL
     * @returns {boolean} 장바구니 추가 성공 여부
     */
    const handleAddToCart = useCallback(
        (addToCart, currentImg) => {
            try {
                // 필수 필드가 포함된 메뉴 아이템 생성
                const menuItemWithDefaults = {
                    ...menuItem,
                    id: menuItem.id || `item-${Date.now()}`,
                    price: typeof menuItem.price === 'number' ? menuItem.price : 0,
                    koreanName: menuItem.koreanName || menuItem.name || '알 수 없음',
                    englishName: menuItem.englishName || menuItem.name || 'Unknown',
                    itemType: menuItem.itemType || 'beverage',
                };

                // 유효성 검사기에서 기대하는 구조로 장바구니 아이템 생성
                const cartItem = {
                    id: `${menuItem.id || 'item'}-${Date.now()}`,
                    item: menuItemWithDefaults,
                    img: currentImg || menuItem.image || '',
                    itemType: menuItemWithDefaults.itemType,
                    temperatureOption: menuItem.temperatureOption || 'ice',
                    options: Array.isArray(options) ? [...options] : [],
                    cupSize: cupSize || 'tall',
                    quantity: typeof quantity === 'number' ? quantity : 1,
                    totalPrice: typeof calculateTotal === 'function' ? calculateTotal() : 0,
                    addedAt: new Date().toISOString(),
                };

                console.log('장바구니에 추가:', cartItem);
                
                // 액션 생성자를 사용해 장바구니에 추가
                addToCart(cartItem);
                
                // 스토리지에도 장바구니 아이템 업데이트
                starbucksStorage.addCart(cartItem);
                
                return true;
            } catch (error) {
                console.error('장바구니 추가 중 오류 발생:', error);
                return false;
            }
        },
        [menuItem, cupSize, options, quantity, calculateTotal],
    );

    return {
        handleAddToCart,
    };
};

/**
 * 장바구니 아이템 작업을 위한 훅
 * @returns {Object} 장바구니 아이템 작업 함수들
 */
export const useCartOperations = () => {
    /**
     * 장바구니에서 아이템을 제거합니다.
     * @param {string} itemId - 제거할 아이템의 ID
     * @param {Function} removeFromCart - 전역 상태에서 아이템을 제거하는 함수
     */
    const removeFromCart = useCallback((itemId, removeFromCart) => {
        removeFromCart(itemId);
        const currentCart = starbucksStorage.getCart();
        const updatedCart = currentCart.filter((item) => item.id !== itemId);
        starbucksStorage.setCart(updatedCart);
    }, []);

    /**
     * 장바구니 아이템의 수량을 업데이트합니다.
     * @param {string} itemId - 업데이트할 아이템의 ID
     * @param {number} newQuantity - 새로운 수량
     * @param {Function} updateCartItem - 전역 상태에서 아이템을 업데이트하는 함수
     */
    const updateCartItemQuantity = useCallback((itemId, newQuantity, updateCartItem) => {
        updateCartItem(itemId, { quantity: newQuantity });
        const currentCart = starbucksStorage.getCart();
        const updatedCart = currentCart.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item,
        );
        starbucksStorage.setCart(updatedCart);
    }, []);

    return {
        removeFromCart,
        updateCartItemQuantity,
    };
};
