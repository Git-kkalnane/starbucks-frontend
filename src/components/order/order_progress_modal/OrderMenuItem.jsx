import React from 'react';

export default function OrderMenuItem({ item }) {
    return (
        <div className="flex items-center gap-3 px-6 pt-3">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 object-cover"
                />
            </div>
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-base leading-tight flex items-center">
                    {item.name} <span className="ml-1 text-gray-400 text-base">♡</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{item.options}</div>
            </div>
        </div>
    );
}
