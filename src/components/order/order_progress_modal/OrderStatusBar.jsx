import React from 'react';
import { OrderStatus } from '../../../_utils/constants/orderStatus';

export default function OrderStatusBar({ orderStatus }) {
    const basicStatus = [
        '',
        OrderStatus.PLACED,
        OrderStatus.PREPARING,
        OrderStatus.READY_FOR_PICKUP,
        OrderStatus.COMPLETED,
    ];
    let currentStatusIndex = basicStatus.indexOf(orderStatus);

    const steps = [
        { label: '주문 완료', activeIndex: 1 },
        { label: '준비 중', activeIndex: 2 },
        { label: '준비 완료', activeIndex: 3 },
    ];

    function StatusStep({ label, isActive }) {
        return (
            <div className="flex-1 text-center">
                <div className={`text-sm font-medium ${isActive ? 'text-starbucks-green' : 'text-gray-300'}`}>{label}</div>
                <div className={`h-1 mt-1 rounded-full ${isActive ? 'bg-starbucks-green' : 'bg-gray-200'}`}></div>
            </div>
        );
    }

    return (
        <div className="flex px-6 pt-3 pb-2 gap-2">
            {steps.map((step, idx) => (
                <StatusStep
                    key={step.label}
                    label={step.label}
                    isActive={currentStatusIndex > step.activeIndex - 1}
                />
            ))}
        </div>
    );
}

