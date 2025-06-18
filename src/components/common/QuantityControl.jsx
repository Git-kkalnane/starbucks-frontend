import React from 'react';
import { CommonText } from './customText';

const QuantityControl = ({
    value = 0,
    onIncrease,
    onDecrease,
    minValue = 0,
    maxValue = 100,
    disabled = false,
    size = 'md',
}) => {
    const sizeClasses = {
        sm: 'w-6 h-6 text-sm',
        md: 'w-8 h-8',
        lg: 'w-10 h-10 text-lg',
    };

    const baseStyle = 'rounded-full border flex items-center justify-center';
    const buttonClasses = `${baseStyle} ${sizeClasses[size] || sizeClasses.md}`;

    return (
        <div className="flex items-center gap-1">
            <button
                onClick={onDecrease}
                disabled={disabled || value <= minValue}
                className={`${buttonClasses} ${value <= minValue ? 'opacity-30' : 'hover:bg-gray-100'}`}
                aria-label="Decrease quantity"
            >
                <CommonText>-</CommonText>
            </button>
            <span className={`w-6 text-center ${sizeClasses[size] ? 'text-sm' : ''}`}>
                <CommonText>{value}</CommonText>
            </span>
            <button
                onClick={onIncrease}
                disabled={disabled || value >= maxValue}
                className={`${buttonClasses} bg-gray-100 hover:bg-gray-200 ${value >= maxValue ? 'opacity-30' : ''}`}
                aria-label="Increase quantity"
            >
                <CommonText>+</CommonText>
            </button>
        </div>
    );
};

export default React.memo(QuantityControl);
