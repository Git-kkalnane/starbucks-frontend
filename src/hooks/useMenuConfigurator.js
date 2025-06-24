import { useState, useMemo } from 'react';
import { starbucksStorage } from '../_utils/starbucksStorage';

const cupSizes = [
    { id: 'solo', name: 'Solo', volume: '30ml', iconSize: 'w-6 h-6' },
    { id: 'doppio', name: 'Doppio', volume: '60ml', iconSize: 'w-8 h-8' },
    { id: 'short', name: 'Short', volume: '250ml', iconSize: 'w-6 h-6' },
    { id: 'tall', name: 'Tall', volume: '355ml', iconSize: 'w-8 h-8' },
    { id: 'grande', name: 'Grande', volume: '473ml', iconSize: 'w-9 h-9' },
    { id: 'venti', name: 'Venti', volume: '591ml', iconSize: 'w-10 h-10' },
];

export const useCupSizes = (menuItem) => {
    const availableCupSizes = useMemo(() => {
        if (!menuItem?.cupSize) return cupSizes;

        const availableSizes = menuItem.cupSize.split('/').map((size) => size.trim().toLowerCase());

        return cupSizes.filter((size) =>
            availableSizes.some((availableSize) => size.name.toLowerCase().includes(availableSize)),
        );
    }, [menuItem?.cupSize]);

    return availableCupSizes;
};

export const useCupSize = (availableCupSizes) => {
    const [cupSize, setCupSize] = useState(availableCupSizes[0]?.id || 'tall');

    const calculateCupSizePrice = (selectedSize, availableSizes, pricePerSizeUp = 500) => {
        const sizeOrder = ['solo', 'doppio', 'short', 'tall', 'grande', 'venti'];
        const selectedSizeIndex = sizeOrder.indexOf(selectedSize);
        const smallestAvailableSize = availableSizes[0]?.id || 'tall';
        const smallestSizeIndex = sizeOrder.indexOf(smallestAvailableSize);

        if (selectedSizeIndex > -1 && smallestSizeIndex > -1) {
            const sizeDifference = selectedSizeIndex - smallestSizeIndex;
            return Math.max(0, sizeDifference * pricePerSizeUp);
        }

        return 0;
    };

    return {
        cupSize,
        setCupSize,
        calculateCupSizePrice,
    };
};

export const useOrderActions = (
    menuItem,
    {
        cupSize,
        availableCupSizes,
        calculateCupSizePrice,
        options,
        calculateOptionsTotal,
        espressoShots,
        calculateCoffeePrice,
        quantity,
    },
) => {
    const calculateTotal = () => {
        let total = menuItem.price;
        total += calculateCupSizePrice(cupSize, availableCupSizes);
        total += calculateCoffeePrice();
        // Use calculateOptionsTotal if provided, otherwise default to 0
        const optionsTotal = calculateOptionsTotal ? calculateOptionsTotal() : 0;
        total += optionsTotal;
        return total * quantity;
    };

    const handleAddToCart = (addToCart, currentImg) => {
        const cartItem = {
            id: menuItem.id,
            item: {
                ...menuItem,
                price: menuItem.price,
            },
            img: currentImg,
            itemType: menuItem.itemType,
            temperatureOption: menuItem.temperatureOption ?? '',
            options: menuItem.options ?? [],
            cupSize,
            quantity,
            totalPrice: calculateTotal(),
        };
        addToCart(cartItem);
        starbucksStorage.addCart(cartItem);
    };

    const handleOrder = () => {
        console.log('Order placed:', {
            cupSize,
            espressoShots,
            options,
            quantity,
            price: calculateTotal(),
        });
    };

    return {
        calculateTotal,
        handleAddToCart,
        handleOrder,
    };
};
