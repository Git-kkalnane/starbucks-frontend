// Validation helpers
export const validateLoading = (loading) => {
    if (typeof loading !== 'boolean') {
        console.error('Invalid loading value:', loading);
        return false;
    }
    return true;
};

export const validateUser = (user) => {
    if (!user || typeof user !== 'object') {
        console.error('Invalid user data:', user);
        return false;
    }
    const requiredFields = ['email', 'nickname'];
    return requiredFields.every((field) => field in user && typeof user[field] === 'string');
};

export const validateCartItem = (item) => {
    if (!item || typeof item !== 'object') return false;

    // Validate required fields
    const hasRequiredFields = [
        'id',
        'item', // The entire menuItem object
        'img', // Image URL
        'itemType', // Type of the item
        'temperatureOption', // Temperature option (iced/hot)
        'options', // Item options
        'cupSize', // Selected cup size
        'quantity', // Quantity of items
        'priceWithOptions', // Calculated option price
    ].every((field) => field in item);

    if (!hasRequiredFields) return false;

    // Additional validation for nested item object
    if (!item.item || typeof item.item !== 'object') return false;

    const requiredItemFields = ['id', 'koreanName', 'englishName', 'price', 'itemType'].every(
        (field) => field in item.item,
    );

    if (!requiredItemFields) return false;

    // Validate types
    return (
        typeof item.quantity === 'number' && typeof item.priceWithOptions === 'number' && Array.isArray(item.options)
    );
};

export const validateStore = (store) => {
    if (!store) return false;
    // TODO 필드명 꼭 챙겨 보기
    return typeof store === 'object' && typeof store.storeId === 'number' && typeof store.name === 'string';
};

/**
 * 주문 데이터의 유효성을 검사합니다.
 * @param {Object} orderData - 검사할 주문 데이터
 * @throws {Error} 유효성 검사 실패 시 에러를 던집니다.
 */
export const validateRequestOrderData = (orderData) => {
    if (!orderData) {
        throw new Error('주문 데이터가 제공되지 않았습니다.');
    }

    const requiredFields = ['storeId', 'pickupType', 'orderTotalPrice', 'orderStatus', 'orderItems'];

    const missingFields = requiredFields.filter((field) => !(field in orderData));
    if (missingFields.length > 0) {
        throw new Error(`필수 필드가 누락되었습니다: ${missingFields.join(', ')}`);
    }

    // 픽업 타입 검증
    const validPickupTypes = ['STORE_PICKUP', 'DELIVERY'];
    if (!validPickupTypes.includes(orderData.pickupType)) {
        throw new Error(`유효하지 않은 픽업 타입입니다: ${orderData.pickupType}`);
    }

    // 주문 상태 검증
    const validOrderStatuses = ['PLACED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'];
    if (!validOrderStatuses.includes(orderData.orderStatus)) {
        throw new Error(`유효하지 않은 주문 상태입니다: ${orderData.orderStatus}`);
    }

    // 가격 검증
    if (typeof orderData.orderTotalPrice !== 'number' || orderData.orderTotalPrice <= 0) {
        throw new Error('유효하지 않은 주문 총액입니다.');
    }

    // 주문 항목 검증
    if (!Array.isArray(orderData.orderItems) || orderData.orderItems.length === 0) {
        throw new Error('주문 항목이 비어있습니다.');
    }

    // 각 주문 항목 검증
    orderData.orderItems.forEach((item, index) => {
        const itemRequiredFields = ['itemId', 'itemType', 'totalPrice', 'itemPrice', 'quantity'];

        const missingItemFields = itemRequiredFields.filter((field) => !(field in item));
        if (missingItemFields.length > 0) {
            throw new Error(`주문 항목 ${index + 1}에 필수 필드가 누락되었습니다: ${missingItemFields.join(', ')}`);
        }

        // 수량 검증
        if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
            throw new Error(`주문 항목 ${index + 1}의 수량이 유효하지 않습니다.`);
        }

        // 가격 검증
        if (typeof item.totalPrice !== 'number' || item.totalPrice <= 0) {
            throw new Error(`주문 항목 ${index + 1}의 총액이 유효하지 않습니다.`);
        }

        if (typeof item.itemPrice !== 'number' || item.itemPrice <= 0) {
            console.error(`${item.koreanName}: ${item.itemPrice}`);
            throw new Error(`주문 항목 ${index + 1}의 단가가 유효하지 않습니다.`);
        }

        // 아이템 타입 검증
        const validItemTypes = ['BEVERAGE', 'DESSERT', 'FOOD'];
        if (!validItemTypes.includes(item.itemType)) {
            throw new Error(`주문 항목 ${index + 1}의 아이템 타입이 유효하지 않습니다: ${item.itemType}`);
        }
    });
};
