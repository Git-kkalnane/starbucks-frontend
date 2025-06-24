import React from 'react';
import { CommonText } from '../../common/customText';
import OrderSummaryItem from './OrderSummaryItem';

const OrderSummary = ({ orderItems, pickupInfo, className = '' }) => {
    return (
        <section className={`h-full max-h-[470px] overflow-y-auto px-5 pt-8 pb-6 bg-custom-gray1 ${className}`}>
            <div className="max-w-md mx-auto">
                <article className="items-center mb-4">
                    <CommonText fontSize="text-base" bold>
                        주문내역 ({orderItems.length})
                    </CommonText>
                </article>

                <article className="w-full rounded-lg bg-[#EDEDED] text-sm items-center my-2 py-3 px-5">
                    <span>픽업 방식: {pickupInfo.method}</span>
                </article>

                <article className="w-full">
                    {orderItems.map((item) => (
                        <OrderSummaryItem key={item.id} item={item} />
                    ))}
                </article>
            </div>
        </section>
    );
};

export default OrderSummary;
