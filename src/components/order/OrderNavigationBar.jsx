import React from 'react';
import { useNavigate } from 'react-router-dom';
import StoreSelectionBanner from '../common/StoreSelectionBanner';
import { HiShoppingBag } from 'react-icons/hi2';

import './styles/OrderNavigationBar.css';

const OrderNavigationBar = ({ itemCount, className }) => {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <section
            className={`order-navigation-bar w-full bg-[#2E2926] flex justify-between items-center px-4 ${className}`}
        >
            <StoreSelectionBanner title="주문할 매장을 선택해주세요" className="w-[calc(100%-4rem)]" />
            <div
                className="relative cursor-pointer"
                onClick={handleCartClick}
                role="button"
                aria-label="장바구니로 이동"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCartClick()}
            >
                <HiShoppingBag className="w-12 h-12 text-white" />
                {itemCount > 0 && (
                    <span className="absolute top-4 right-3 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {itemCount}
                    </span>
                )}
            </div>
        </section>
    );
};

export default OrderNavigationBar;
