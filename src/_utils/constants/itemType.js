/**
 * Item types that match the backend's ItemType enum
 * @readonly
 * @enum {string}
 */
const ItemType = Object.freeze({
    DESSERT: 'DESSERT',
    BEVERAGE: 'BEVERAGE',
    COFFEE: 'COFFEE',

    /**
     * Converts a string value to its corresponding ItemType
     * @param {string} value - The string value to convert
     * @returns {string} The corresponding ItemType (defaults to DESSERT if no match found)
     */
    fromString: (value) => {
        if (!value) return ItemType.DESSERT;
        const upperValue = value.toUpperCase();
        return Object.values(ItemType).includes(upperValue) ? upperValue : ItemType.DESSERT;
    },
});

export default ItemType;
