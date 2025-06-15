import React from 'react';

export function CommonBtn({
    title,
    bgColor = 'bg-white',
    textColor = 'text-black',
    hoverOpacity = 'hover:opacity-90',
    textSize = 'text-sm',
    fullWidth = false,
    paddingX = 'px-6',
    paddingY = 'py-3',
    onClick,
    className = '',
}) {
    return (
        <button
            className={`
        inline-block
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${paddingY} ${paddingX}
        rounded-full
        font-sans
        font-semibold
        cursor-pointer
        border border-[#01A862]
        transition duration-300 ease-in-out
        ${textSize}
        ${bgColor} ${textColor} ${hoverOpacity}
        ${className}
      `}
            onClick={onClick}
        >
            {title}
        </button>
    );
}
