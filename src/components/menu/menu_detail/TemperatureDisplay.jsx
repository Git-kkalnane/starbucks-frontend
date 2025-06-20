import React from 'react';

function TemperatureDisplay({ isIced = false, isActive, className = '' }) {
    const displayText = isIced ? 'Iced Only' : 'Hot Only';

    return (
        <div className={` p-1.5 border-[1px] border-gray-200 rounded-full w-full mx-auto ${className}`}>
            <div className="flex items-center">
                {/* Title Display - Shows either 'Iced Only' or 'Hot Only' */}
                <div className=" bg-white w-full py-2 text-center rounded-full text-sm font-medium">
                    <span
                        className={`${isActive ? 'font-semibold text-lg' : 'text-gray-500'} ${
                            isActive ? (isIced ? 'text-blue-600' : 'text-red-600') : ''
                        }`}
                    >
                        {displayText}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TemperatureDisplay;
