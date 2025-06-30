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

export const validateOrder = (order) => {
    if (!order || typeof order !== 'object') return false;
    return (
        typeof order.id === 'number' &&
        Array.isArray(order.items) &&
        order.items.every(validateCartItem) &&
        typeof order.total === 'number' &&
        ['pending', 'preparing', 'ready', 'completed', 'cancelled'].includes(order.status)
    );
};
