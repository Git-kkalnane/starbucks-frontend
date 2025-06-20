import { useState, useEffect } from 'react';

export const useOptionCount = (initialOptions = [], defaultCount = 2) => {
    const [inputOptions] = useState(Array.isArray(initialOptions) ? initialOptions : []);
    const [options, setOptions] = useState(
        (Array.isArray(initialOptions) ? initialOptions : []).reduce(
            (acc, syrup) => ({
                ...acc,
                [syrup.id]: 0,
            }),
            {},
        ),
    );

    if (!Array.isArray(inputOptions)) {
        console.error('syrupOptions must be an array');
        inputOptions = [];
    }

    useEffect(() => {
        setOptions((prev) => ({
            ...prev,
            vanilla: defaultCount,
        }));
    }, [defaultCount]);

    const updateOptions = (syrupId, value) => {
        const currentValue = options[syrupId] || 0;
        const newValue = currentValue + value;

        // 시럽추가는 개별로 최대 5개까지만 가능
        if (newValue >= 0 && (value < 0 || (value > 0 && newValue <= 5))) {
            setOptions((prev) => ({
                ...prev,
                [syrupId]: newValue,
            }));
        }
    };

    const calculateOptionsTotal = () => {
        if (!Array.isArray(inputOptions)) {
            console.error('syrupOptions is not an array:', inputOptions);
            return 0;
        }
        return inputOptions.reduce((sum, syrup) => {
            const syrupPrice = typeof syrup.price === 'number' ? syrup.price : 0;
            const syrupCount = typeof options[syrup.id] === 'number' ? options[syrup.id] : 0;
            return sum + syrupCount * syrupPrice;
        }, 0);
    };

    return {
        options,
        updateOptions,
        calculateOptionsTotal,
    };
};

export default useOptionCount;
