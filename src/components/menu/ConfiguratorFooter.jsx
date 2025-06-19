import React from 'react';
import QuantityControl from '../common/QuantityControl';
import { CommonText } from '../common/customText';
import { CommonBtn } from '../common/customBtn';

const ConfiguratorFooter = ({ quantity, onQuantityChange, totalPrice, onAddToCart, onOrder }) => {
    return (
        <section className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
                <QuantityControl
                    value={quantity}
                    onIncrease={() => onQuantityChange(1)}
                    onDecrease={() => onQuantityChange(-1)}
                    minValue={1}
                />
                <CommonText fontSize="text-2xl" bold={true} className="ml-2 px-6 text-black">
                    {totalPrice.toLocaleString()}원
                </CommonText>
            </div>
            <div className="flex gap-2">
                <CommonBtn
                    onClick={onAddToCart}
                    bgColor="bg-white"
                    textColor="text-black"
                    className="flex-1 py-3 border border-gray-400 rounded-full font-medium"
                >
                    담기
                </CommonBtn>
                <CommonBtn
                    onClick={onOrder}
                    bgColor="bg-starbucks-green"
                    textColor="text-white"
                    className="flex-1 py-3 rounded-full font-medium"
                >
                    주문하기
                </CommonBtn>
            </div>
        </section>
    );
};

export default ConfiguratorFooter;
