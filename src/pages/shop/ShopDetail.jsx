import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../../layouts/CommonLayout';
import { CommonHeader } from '../../components/common/customHeader';
import { CommonDivider } from '../../components/common/Divider';
import ShopImage from '../../components/shop/shop_detail/ShopImage';
import ShopBasicInfo from '../../components/shop/shop_detail/ShopBasicInfo';
import ShopHoursAndDirections from '../../components/shop/shop_detail/ShopHoursAndDirections';
import OrderTypeSelector from '../../components/shop/shop_detail/OrderTypeSelector';

function ShopDetail() {
    const navigate = useNavigate();

    const [store, setStore] = useState({
        name: '스타벅스 강남R점',
        address: '서울특별시 종로구 세종대로 209 (세종로)',
        businessHours: '07:00 ~ 21:30',
        direction: 'OO 빌딩 1층',
        description: '편안한 분위기에서 커피를 즐기실 수 있습니다.',
        image: 'https://image.istarbucks.co.kr//upload/store/2021/12/[9319]_20211222090208_scyh3.jpg', // 실제 이미지 URL로 대체 가능
    });

    const handleOrderTypeSelect = (orderType) => {
        console.log('Selected order type:', orderType);
    };

    return (
        <CommonLayout className="bg-white min-h-screen flex flex-col">
            <CommonHeader onBack={() => navigate(-1)} />

            <ShopImage image={store.image} name={store.name} />

            <div className="flex-1 p-6">
                <ShopBasicInfo name={store.name} address={store.address} className="mb-6" />

                <CommonDivider thickness={8} color="gray-100" />

                <ShopHoursAndDirections
                    businessHours={store.businessHours}
                    direction={store.direction}
                    className="mb-6"
                />
            </div>

            <OrderTypeSelector onSelectOrderType={handleOrderTypeSelect} />
        </CommonLayout>
    );
}

export default ShopDetail;
