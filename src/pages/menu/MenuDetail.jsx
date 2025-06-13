import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../../layouts/CommonLayout';
import MenuHeader from '../../components/menu/MenuHeader';
import MenuInfo from '../../components/menu/MenuInfo';
import OrderActionBtn from '../../components/menu/MenuAction';
import TemperatureToggle from '../../components/menu/TemperatureToggle';

function MenuDetail() {
    const navigate = useNavigate();
    const [isIced, setIsIced] = useState(true);

    const menuItem = {
        name: '아이스 스타벅스 돌체 라떼',
        englishName: 'Iced Starbucks Dolce Latte',
        description:
            '스타벅스의 다른 커피 음료보다 더욱 깊은 커피의 맛과 향에 깔끔한 무지방 우유와 돌체 시럽이 들어간 음료로 달콤하고 진한 카페 라떼',
        price: 6100,
        img: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[128695]_20210426092031969.jpg',
    };

    return (
        <CommonLayout>
            <MenuHeader imageUrl={menuItem.img} name={menuItem.name} onBack={() => navigate(-1)} />
            <div className="flex flex-col min-h-0 ">
                <div className="px-6 overflow-y-auto flex-1">
                    <MenuInfo
                        name={menuItem.name}
                        englishName={menuItem.englishName}
                        description={menuItem.description}
                        price={menuItem.price}
                    />
                    <div className="mb-24">
                        <TemperatureToggle isIced={isIced} setIsIced={setIsIced} />
                    </div>
                </div>
                <OrderActionBtn price={menuItem.price} />
            </div>
        </CommonLayout>
    );
}

export default MenuDetail;
