import React from 'react';

const DebugButton = ({
    onClick,
    title,
    color = 'bg-blue-500',
    className = '',
    icon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    ),
}) => {
    return (
        <button
            onClick={onClick}
            className={`${color} text-white p-2 rounded-full shadow-lg transition-colors ${className}`}
            title={title}
        >
            {icon}
        </button>
    );
};

export default DebugButton;
