import React from 'react';

const MenuInfo = ({ name, englishName, description, price, isBest = false, className }) => {
    return (
        <section className={`mb-6 mt-5 flex flex-col items-start ${className}`}>
            <div className="flex w-full justify-between items-start mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                {isBest && (
                    <span className="bg-starbucks-green text-white text-xs font-medium px-2 py-1 rounded">BEST</span>
                )}
            </div>
            <p className="text-disabled-string text-sm mb-3 pr-4">{englishName}</p>
            <p className="text-disabled-string text-sm mb-6 pr-4 whitespace-pre-line">{description}</p>
            <p className="text-black text-2xl font-bold mb-6">{price.toLocaleString()}원</p>
        </section>
    );
};

export default MenuInfo;
