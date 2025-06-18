import { useState, useEffect } from 'react';

export const useSyrupCount = (initialSyrupOptions = [], defaultSyrupCount = 2) => {
    const [syrupOptions] = useState(Array.isArray(initialSyrupOptions) ? initialSyrupOptions : []);
    const [syrups, setSyrups] = useState(
        (Array.isArray(initialSyrupOptions) ? initialSyrupOptions : []).reduce(
            (acc, syrup) => ({
                ...acc,
                [syrup.id]: 0,
            }),
            {},
        ),
    );

    if (!Array.isArray(syrupOptions)) {
        console.error('syrupOptions must be an array');
        syrupOptions = [];
    }

    useEffect(() => {
        setSyrups((prev) => ({
            ...prev,
            vanilla: defaultSyrupCount,
        }));
    }, [defaultSyrupCount]);

    const updateSyrup = (syrupId, value) => {
        const currentValue = syrups[syrupId] || 0;
        const newValue = currentValue + value;

        // 시럽추가는 개별로 최대 5개까지만 가능
        if (newValue >= 0 && (value < 0 || (value > 0 && newValue <= 5))) {
            setSyrups((prev) => ({
                ...prev,
                [syrupId]: newValue,
            }));
        }
    };

    const calculateSyrupTotal = () => {
        if (!Array.isArray(syrupOptions)) {
            console.error('syrupOptions is not an array:', syrupOptions);
            return 0;
        }
        return syrupOptions.reduce((sum, syrup) => {
            const syrupPrice = typeof syrup.price === 'number' ? syrup.price : 0;
            const syrupCount = typeof syrups[syrup.id] === 'number' ? syrups[syrup.id] : 0;
            return sum + syrupCount * syrupPrice;
        }, 0);
    };

    return {
        syrups,
        updateSyrup,
        calculateSyrupTotal,
    };
};

export default useSyrupCount;
