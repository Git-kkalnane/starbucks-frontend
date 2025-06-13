import React from 'react';
import { CommonBtn } from '../common/customBtn';

const OrderActionBtn = ({ onOrder, buttonText = '주문하기', className }) => {
    return (
        <div className="sticky bottom-0 bg-white px-6 py-4">
            <CommonBtn
                title={`${buttonText}`}
                fullWidth
                textSize="text-xl"
                bgColor="bg-starbucks-green"
                textColor="text-white"
                onClick={onOrder}
                className={`border border-transparent h-14 ${className}`}
            />
        </div>
    );
};

export default OrderActionBtn;
