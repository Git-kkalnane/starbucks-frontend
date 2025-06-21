import React, { useState } from 'react';

export function CommonTextInput({
    type = 'text',
    name = '',
    placeholder = '',
    className = '',
    containerClassName = '',
    inputColor = '#000000',
    focusColor = '#22c55e',
    errorColor = '#ef4444',
    hasError = false,
    required = false,
    onChange = () => {},
    onBlur = () => {},
    value = '',
    maxLength = 25,
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={containerClassName}>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                required={required}
                maxLength={maxLength}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    setIsFocused(false);
                    onBlur(e);
                }}
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
