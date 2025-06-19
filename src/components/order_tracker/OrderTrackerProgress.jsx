import React from 'react';
import { CommonText } from '../common/customText';

const OrderTrackerProgress = ({ currentStep, className = '' }) => {
    const steps = [
        { id: 'order', label: '주문 완료' },
        { id: 'making', label: '준비 중' },
        { id: 'ready', label: '준비 완료' },
    ];

    return (
        <section className={`relative mt-8 px-6 ${className}`}>
            {/* Progress line */}
            <article className="absolute bottom-1 left-6 right-6 h-3 bg-white rounded-full">
                <div className="w-full h-full bg-custom-gray1 transition-all duration-500 rounded-full" />
            </article>
            {/* Steps */}
            <article className="w-full relative flex flex-1 z-1">
                {steps.map((step, idx) => (
                    <div key={step.id} className="w-full flex flex-col items-center">
                        <CommonText
                            fontSize="text-sm"
                            weight={idx <= currentStep ? 'font-bold' : 'font-normal'}
                            className="mb-2 text-black"
                        >
                            {step.label}
                        </CommonText>
                        <div
                            className={`w-full h-3 rounded-full mb-1 ${
                                idx === currentStep ? 'bg-starbucks-green' : 'bg-custom-gray1'
                            }`}
                        />
                    </div>
                ))}
            </article>
        </section>
    );
};

export default OrderTrackerProgress;
