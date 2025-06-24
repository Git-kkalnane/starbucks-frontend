import React from 'react';
import CommonLayout from '../components/layouts/CommonLayout';
import { ColumnHeader } from '../components/common/customHeader';
import AuthPanel from '../components/other/auth_panel/AuthPanel';
import ServicePanel from '../components/other/service_panel/ServicePanel';
import StoreLocation from '../components/other/store_location/StoreLocation';
import ReceiptSVG from '../assets/icons/receipt.svg?react';
import LockSVG from '../assets/icons/lock.svg?react';
import AccountSVG from '../assets/icons/account.svg?react';
import CartSVG from '../assets/icons/cart.svg?react';
import HistorySVG from '../assets/icons/history.svg?react';
import CustomerServiceSVG from '../assets/icons/customer-service.svg?react';

function Other() {
    const services = [
        // TODO 아이콘 색상  SVG 파일 자체 변경
        // TODO 이동 경로 제대로 추가하기
        // { icon: <ReceiptSVG className="[&>path]:!stroke-starbucks-green" width={24} height={24} />, label: '영수증' },
        { icon: <ReceiptSVG />, label: '영수증', to: '/mock' },
        { icon: <LockSVG />, label: '개인정보 관리', to: '/mock' },
        { icon: <AccountSVG />, label: '계정정보', to: '/mock' },
        { icon: <CartSVG />, label: '장바구니', to: '/cart' },
        { icon: <HistorySVG />, label: '과거 주문내역', to: '/mock' },
        { icon: <CustomerServiceSVG />, label: '문의하기', to: '/mock' },
    ];
    return (
        <CommonLayout>
            <ColumnHeader
                title="Other"
                height="h-32"
                bgColor="white"
                className="pt-20 shadow-[0_2px_3px_-1px_rgba(0,0,0,0.3)]"
            />

            <div className="px-10 sm:px-22 md:px-7">
                {/* 로그인 안내 영역 */}
                <AuthPanel className="my-7" />

                {/* 서비스 메뉴 아이콘 영역 */}
                <ServicePanel services={services} />

                {/* 매장 위치 정보 */}
                <StoreLocation className="mt-7" />
            </div>
        </CommonLayout>
    );
}

export default Other;
