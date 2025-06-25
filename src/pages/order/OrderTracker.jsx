import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layouts/CommonLayout';
import OrderTrackerIntro from '../../components/order/order_tracker/OrderTrackerIntro';
import OrderTrackerProgress from '../../components/order/order_tracker/OrderTrackerProgress';
import OrderSummary from '../../components/order/order_tracker/OrderSummary';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import { useUser } from '../../contexts/UserContext';

const orderMsg = {
    title: '주문을 확인하고 있어요',
    subtitle: '주문 승인 즉시 메뉴 준비가 시작돼요\n완성 후 빠르게 픽업해 주세요',
};
const makingMsg = {
    title: '주문을 준비하고 있어요',
    subtitle: '파트너가 주믄을 준비하고 있어요.\n잠시만 기다려 주세요',
};
const readyMsg = {
    title: '주문이 픽업 대기 중이에요',
    subtitle: '주문이 준비되었어요.\n카운터에서 픽업해 주세요',
};

const OrderTracker = () => {
    const [currentMsg, setCurrentMsg] = useState(orderMsg);
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    const { state: userState } = useUser();

    useAuthRedirect({
        requireAuth: true,
        authState: userState,
    });

    // Order data
    const pickupInfo = {
        method: '매장 내 픽업',
        location: '강남대로점',
        estimatedTime: '약 5분 소요 예정',
    };

    const orderItems = [
        {
            id: 1,
            name: '에스프레소 콘 파나',
            img: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[30]_20210415144252244.jpg',
            price: 4500,
            temperature: 'HOT',
            size: 'Tall',
            options: [
                { name: '시나몬 시럽', price: 500 },
                { name: '바닐라 시럽', price: 600 },
            ],
        },
        {
            id: 2,
            name: '아이스 카페라떼',
            img: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110569]_20210415143035989.jpg',
            price: 4500,
            temperature: 'ICE',
            size: 'Tall',
            options: [
                { name: '시나몬 시럽', price: 500 },
                { name: '바닐라 시럽', price: 600 },
            ],
        },
        {
            id: 3,
            name: '아이스 스타벅스 돌체 라떼',
            img: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001941]_20210225094346653.jpg',
            price: 6100,
            temperature: 'ICE',
            size: 'Grande',
            options: [
                { name: '시나몬 시럽', price: 500 },
                { name: '바닐라 시럽', price: 600 },
            ],
        },
    ];

    // 5초 후에 메시지 변경
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentMsg(readyMsg);
            setCurrentStep(2);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <CommonLayout className="h-full">
            <div className="h-full flex flex-col">
                <OrderTrackerIntro
                    shopName={pickupInfo.location}
                    title={currentMsg.title}
                    subtitle={currentMsg.subtitle}
                />
                <OrderTrackerProgress currentStep={currentStep} />
                <OrderSummary orderItems={orderItems} pickupInfo={pickupInfo} />
            </div>
        </CommonLayout>
    );
};

export default OrderTracker;
