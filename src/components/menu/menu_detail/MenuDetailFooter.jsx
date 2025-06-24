import React from 'react';
import { CommonBtn } from '../../common/customBtn';

const MenuDetailFooter = ({ onOrder, buttonText = '주문하기', className = '', price, showStickyBar = true }) => {
    const button = (
        <CommonBtn
            title={price ? `${price.toLocaleString()}원 ${buttonText}` : buttonText}
            fullWidth
            textSize="text-xl"
            bgColor="bg-starbucks-green"
            textColor="text-white"
            onClick={onOrder}
            className={`border border-transparent h-14 ${className}`}
        />
    );

    if (!showStickyBar) {
        return button;
    }

    return (
        <div className=" bg-white border-t border-gray-100 px-4 py-3">
            <div className="max-w-md mx-auto w-full">{button}</div>
        </div>
    );
};

export default MenuDetailFooter;
