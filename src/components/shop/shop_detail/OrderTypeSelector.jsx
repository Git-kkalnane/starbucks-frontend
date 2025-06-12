import React from 'react';
import { CommonText } from '../../common/customText';

const OrderTypeSelector = ({ onSelectOrderType, className }) => {
    const orderTypes = [
        { id: 'dine-in', label: '매장 이용' },
        { id: 'takeout', label: '테이크 아웃' },
    ];

    return (
        <div className={`p-4 bg-white border-t border-gray-100 ${className}`}>
            <div className="mb-6">
                <CommonText fontSize="sm" bold className="text-gray-800">
                    주문 유형
                </CommonText>
            </div>
            <div className="flex gap-5 justify-center">
                {orderTypes.map((type) => (
                    <button
                        key={type.id}
                        className="w-1/3 max-w-[180px] aspect-square border border-gray-300 rounded-xl text-gray-800 font-medium flex flex-col items-center justify-center"
                        onClick={() => onSelectOrderType(type.id)}
                    >
                        <span className="text-lg mt-1">{type.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OrderTypeSelector;
