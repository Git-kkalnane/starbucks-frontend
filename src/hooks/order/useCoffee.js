import { useState } from 'react';

export const useCoffee = (initialShots = 2, maxShots = 5) => {
    const [espressoShots, setEspressoShots] = useState(initialShots);

    const updateEspressoShots = (_, value) => {
        const newValue = espressoShots + value;
        if (newValue >= 1 && newValue <= maxShots) {
            setEspressoShots(newValue);
        }
    };

    const calculateCoffeePrice = () => {
        return Math.max(0, espressoShots - 2) * 500; // 2샷 이후부터 샷당 500원 추가
    };

    return {
        espressoShots,
        updateEspressoShots,
        calculateCoffeePrice,
    };
};

export default useCoffee;
