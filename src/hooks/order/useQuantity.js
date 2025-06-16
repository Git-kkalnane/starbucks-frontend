import { useState } from 'react';

export const useQuantity = (initial = 1, max = 20) => {
    const [quantity, setQuantity] = useState(initial);

    const updateQuantity = (value) => {
        const newValue = quantity + value;
        if (newValue >= 1 && newValue <= max) {
            setQuantity(newValue);
        }
    };

    return {
        quantity,
        updateQuantity,
    };
};

export default useQuantity;
