import React, { useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';
import OrderProgressModal from '../order/order_progress_modal/OrderProgressModal';

export default function ActiveOrderBtn({ onClick, orders = [] }) {
    const order = orders[0];
    const [open, setOpen] = useState(false);
    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="px-5 py-2 max-w-[400px] w-11/12 flex justify-center bg-white border border-starbucks-green rounded-2xl"
                aria-label="진행중인 주문 알림"
            >
                <div className="w-full flex flex-col justify-end ">
                    <div className="text-gray-500 text-base mb-0.5 font-normal self-start">{`${order.storeInfo.storeName} (${order.pickupType})`}</div>
                    <div className="pl-8 flex justify-start items-center gap-4">
                        <BsClockHistory className="text-2xl" />
                        {/* Info Section */}
                        <div className="flex flex-col justify-center min-w-0">
                            <div className="font-bold text-lg text-gray-900 leading-snug">{`${order.orderNumber} 주문, 총${order.totalCount}개 (${order.orderStatus})`}</div>
                        </div>
                    </div>
                </div>
            </div>
            {open && (
                <div className="md:pl-[var(--nav-width)] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <OrderProgressModal open={open} onClose={() => setOpen(false)} />
                </div>
            )}
        </>
    );
}
