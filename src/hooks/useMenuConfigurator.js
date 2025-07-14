import { useState, useMemo } from 'react';
import { useCart } from './useCart';

const cupSizes = [
    { id: 'SOLO', name: 'Solo', volume: '30ml', iconSize: 'w-6 h-6' },
    { id: 'DOPPIO', name: 'Doppio', volume: '60ml', iconSize: 'w-8 h-8' },
    { id: 'SHORT', name: 'Short', volume: '250ml', iconSize: 'w-6 h-6' },
    { id: 'TALL', name: 'Tall', volume: '355ml', iconSize: 'w-8 h-8' },
    { id: 'GRANDE', name: 'Grande', volume: '473ml', iconSize: 'w-9 h-9' },
    { id: 'VENTI', name: 'Venti', volume: '591ml', iconSize: 'w-10 h-10' },
];

export const useCupSizes = (menuItem) => {
    console.log(menuItem.sizeOptions);
    const availableCupSizes = useMemo(() => {
        if (!menuItem?.sizeOptions) return cupSizes;

        const availableSizes = menuItem.sizeOptions.map((size) => size.name.toLowerCase());

        return cupSizes.filter((size) =>
            availableSizes.some((availableSize) => size.name.toLowerCase().includes(availableSize)),
        );
    }, [menuItem?.sizeOptions]);

    return availableCupSizes;
};

export const useCupSize = (availableCupSizes) => {
    const [cupSize, setCupSize] = useState(availableCupSizes[0]?.id || 'TALL');

    const calculateCupSizePrice = (selectedSize, availableSizes, pricePerSizeUp = 500) => {
        const sizeOrder = ['SOLO', 'DOPPIO', 'SHORT', 'TALL', 'GRANDE', 'VENTI'];
        const selectedSizeIndex = sizeOrder.indexOf(selectedSize);
        const smallestAvailableSize = availableSizes[0]?.id || 'TALL';
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
    const calculateFinalPriceWithOptions = () => {
        let total = menuItem.price;
        total += calculateCupSizePrice(cupSize, availableCupSizes);
        total += calculateCoffeePrice();
        // Use calculateOptionsTotal if provided, otherwise default to 0
        const optionsTotal = calculateOptionsTotal ? calculateOptionsTotal() : 0;
        total += optionsTotal;
        return total;
    };

    // Use the new useCart hook for cart-related operations
    const { handleAddToCart } = useCart(menuItem, {
        cupSize,
        availableCupSizes,
        calculateCupSizePrice,
        options,
        calculateOptionsTotal,
        quantity,
        calculateFinalPriceWithOptions,
    });

    const handleOrder = () => {
        console.log('Order placed:', {
            cupSize,
            espressoShots,
            options,
            quantity,
            price: calculateFinalPriceWithOptions(),
        });
    };

    return {
        calculateFinalPriceWithOptions,
        handleAddToCart,
        handleOrder,
    };
};
