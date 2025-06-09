import React, { useState } from 'react';

export function CommonTextInput({
    type = 'text',
    placeholder = '',
    className = '',
    containerClassName = '',
    inputColor = '#000000',
    focusColor = '#22c55e',
    errorColor = '#ef4444',
    hasError = false,
    onChange = () => {},
    value = '',
    maxLength = 25,
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={containerClassName}>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength} // 여기서 제한 걸어줌
                onChange={(e) => onChange(e)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full p-3 border rounded-md focus:outline-none ${className}`}
                style={{
                    color: inputColor,
                    borderColor: hasError ? errorColor : '#d1d5db',
                    boxShadow: isFocused && !hasError ? `0 0 0 2px ${focusColor}` : 'none',
                    transition: 'box-shadow 0.2s ease',
                }}
            />
        </div>
    );
}
