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
        'koreanName',
        'englishName',
        'itemType',
        'temperatureOption',
        'cupSize',
        'options',
        'quantity',
        'totalPrice',
        'itemPrice',
    ].every((field) => field in item);

    if (!hasRequiredFields) return false;

    return true;
};

export const validateStore = (store) => {
    if (!store) return false;
    // TODO 필드명 꼭 챙겨 보기
    return typeof store === 'object' && typeof store.storeId === 'string' && typeof store.name === 'string';
};

export const validateOrder = (order) => {
    if (!order || typeof order !== 'object') return false;
    return (
        typeof order.id === 'string' &&
        Array.isArray(order.items) &&
        order.items.every(validateCartItem) &&
        typeof order.total === 'number' &&
        ['pending', 'preparing', 'ready', 'completed', 'cancelled'].includes(order.status)
    );
};
