import React from 'react';
import { CommonText } from '../../common/customText';

const OrderSummaryItem = ({ item, className = '' }) => {
    return (
        <section className={`bg-transparent rounded-lg p-4 my-1 ${className}`}>
            <article className="flex items-start">
                <div className="relative flex-shrink-0 mr-4">
                    <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="h-full min-h-[80px] flex flex-col items-start justify-center">
                    <CommonText fontSize="sm" bold>
                        {item.name}
                    </CommonText>
                    <CommonText fontSize="xs" className="text-gray-500">
                        {item.temperature} | {item.size}
                    </CommonText>
                </div>
            </article>
        </section>
    );
};

export default OrderSummaryItem;
