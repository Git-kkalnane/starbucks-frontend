import axios from 'axios';
import api from './api';
import { validateCartItem } from '../_utils/validators';

export const CartCommandService = {
    async addItemToCart(cartItemData, options = {}) {
        try {
            validateCartItem(cartItemData);
            const addCartItemRequest = {
                id: 0,
                items: [
                    {
                        itemId: cartItemData.item.id,
                        itemType: cartItemData.itemType,
                        temperatureOption: cartItemData.temperatureOption,
                        itemOptions: cartItemData.options,
                        cupSize: cartItemData.cupSize,
                        quantity: cartItemData.quantity,
                        priceWithOptions: cartItemData.priceWithOptions,
                    },
                ],
                totalPrice: cartItemData.priceWithOptions * cartItemData.quantity,
            };
            console.log('Adding item to cart:', addCartItemRequest.items[0]);

            const response = await api.post(`/carts`, addCartItemRequest, options);
            console.log('Item added to cart successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw error;
        }
    },
};
