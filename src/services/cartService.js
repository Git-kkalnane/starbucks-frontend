import axios from 'axios';
import api from './api';
import { validateCartItem } from '../_utils/validators';

export const CartCommandService = {
    async addItemToCart(cartItemData, options = {}) {
        try {
            validateCartItem(cartItemData);
            const cartItemDto = {
                id: 0,

                itemId: cartItemData.item.id,
                image: cartItemData.img,
                itemType: cartItemData.itemType,
                temperatureOption: cartItemData.temperatureOption,
                itemOptions: cartItemData.options,
                cupSize: cartItemData.cupSize,
                quantity: cartItemData.quantity,
                priceWithOptions: cartItemData.priceWithOptions,
                totalPrice: cartItemData.priceWithOptions * cartItemData.quantity,
            };
            console.log('Adding item to cart:', cartItemDto);

            const response = await api.post(`/carts/addItem`, cartItemDto, options);
            console.log('Item added to cart successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw error;
        }
    },
};
