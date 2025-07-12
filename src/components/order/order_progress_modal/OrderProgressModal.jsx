import React, { useState, useEffect } from 'react';
import OrderStatusBar from './OrderStatusBar';
import OrderReceiptBar from './OrderReceiptBar';
import OrderMenuList from './OrderMenuList';
import { OrderQueryService } from '../../../services/OrderService';
import LoadingSpinner from '../../common/LoadingSpinner';

export default function OrderProgressModal({ orderIds = [], open, onClose }) {
    if (!open) return null;

    const [orderDetailData, setOrderDetailData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await Promise.all(
                orderIds.map((orderId) => OrderQueryService.fetchCurrentOrderDetail(orderId)),
            );
            setOrderDetailData(data);
            console.log('orderDetailData ', data);
        }
        fetchData();
    }, [orderIds]);

    if (!orderDetailData.length) return <LoadingSpinner />;

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-t-2xl pb-8 shadow-lg animate-fadeInUp relative">
            {/* Close Button */}
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 text-2xl">
                &times;
            </button>
            {/* 매장명 및 이용 타입 */}
            <div className="text-sm text-starbucks-green font-semibold pt-6 pb-1 px-6">
                {orderDetailData[0].storeInfo.storeName}({orderDetailData[0].pickupType})
            </div>
            {/* 주문 진행 상태 */}
            <div className="px-6 pb-2">
                <div className="text-xl font-bold text-gray-900 leading-snug mb-1">
                    {orderDetailData[0].orderNumber}님의 주문은 {orderDetailData[0].orderStatus} 상태입니다.
                    <span role="img" aria-label="hourglass">
                        ⏳
                    </span>
                </div>
                <div className="text-gray-500 text-sm leading-tight">
                    신속하고 정확하게 준비하겠스빈다. 준비 완료 후 빠르게 픽업해 주세요.
                </div>
            </div>
            {/* 진행상태 바 */}
            <OrderStatusBar />
            {/* 주문내역, 영수증 버튼 */}
            {/* <OrderReceiptBar /> */}
            {/* 포장 옵션 */}
            <div className="px-6 pb-1">
                <div className="text-xs text-gray-500 bg-gray-100 rounded-md px-3 py-1 inline-block">
                    포장 옵션 : 포장 안함
                </div>
            </div>
            {/* 주문 상품 리스트 */}
            <OrderMenuList orderItems={orderDetailData[0].orderItems} />
        </div>
    );
}
