import React, { useState } from 'react';
import CommonLayout from '../../components/layouts/CommonLayout';
import OrderProgressModal from '../../components/order/order_progress_modal/OrderProgressModal';

export default function OrderProgress() {
    const [open, setOpen] = useState(true);
    return (
        <CommonLayout>
            <button
                className="mt-20 mx-auto block bg-starbucks-green text-white px-6 py-2 rounded-xl"
                onClick={() => setOpen(true)}
            >
                주문 준비상태 보기 (모달)
            </button>
            <OrderProgressModal open={open} onClose={() => setOpen(false)} />
        </CommonLayout>
    );
}
