import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CommonLayout from '../../layouts/CommonLayout';
import MenuHeaderPanel from '../../components/menu/menu_detail/MenuDetailPanel';
import MenuInfo from '../../components/menu/MenuInfo';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import MenuDetailFooter from '../../components/menu/menu_detail/MenuDetailFooter';
import TemperaturePanel from '../../components/menu/menu_detail/TemperaturePanel';

const defaultItem = {
    id: 0,
    itemType: 'beverage',
    temperatureOption: 'hot',
    koreanName: '(Default)플랫 화이트',
    englishName: 'Flat White',
    category: '에스프레소',
    price: 5800,
    description: '벨벳 같은 미세 거품과 진한 에스프레소',
    isIce: false,
    isCoffee: true,
    cupSize: 'Short/Tall/Grande/Venti',
    options: ['카라멜 시럽'],
    img: {
        hot: 'https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000005178]_20240326103727795.jpg',
        cold: 'https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000005181]_20240326103832835.jpg',
    },
};

function MenuDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isIced, setIsIced] = useState(true);
    const [menuItem, setMenuItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const initTemperatureOption = location.state?.menuItem?.temperatureOption;

    // Update temperatureOption when isIced changes
    useEffect(() => {
        if (menuItem) {
            const temperatureOption = isIced ? 'iced' : 'hot';
            setMenuItem((prev) => ({
                ...prev,
                temperatureOption,
                isIce: isIced,
            }));
            // console.log('isIced changed:', temperatureOption);
        }
    }, [isIced]);

    // Get menu item from navigation state or fetch it
    useEffect(() => {
        if (location.state?.menuItem) {
            console.log('Menu item received:', location.state.menuItem);
            const item = location.state.menuItem;
            setMenuItem(item);
            if (initTemperatureOption === 'Hot only') {
                setIsIced(false);
                // console.log('item.temperatureOption === "Hot only');
            } else if (initTemperatureOption === 'Ice only') {
                setIsIced(true);
            }
            // Ice/Hot인 경우
            else if (item.temperatureOption) {
                console.log('else if (item.temperatureOption):');
                setIsIced(item.temperatureOption === 'iced');
            }

            setIsLoading(false);
        } else {
            // Fallback: If no menuItem in state, use a default item
            // In a real app, you might want to fetch the item using the ID from the URL
            console.warn('No menu item data received, using fallback data');

            setMenuItem(defaultItem);
            setIsIced(defaultItem.isIce);
            setIsLoading(false);
        }
    }, [location.state]);
    if (isLoading || !menuItem) {
        return (
            <CommonLayout>
                <LoadingSpinner />
            </CommonLayout>
        );
    }

    console.log(`${menuItem.koreanName} temperatureOption:`, initTemperatureOption);
    console.log(`${menuItem.koreanName} temperatureOption:`, menuItem);

    return (
        <CommonLayout className=" min-h-screen">
            {/* Main content area with minimum height and flexible growth */}
            <div className="flex-1 min-h-0 flex flex-col">
                <div className="overflow-y-auto flex-1">
                    <MenuHeaderPanel
                        itemType={menuItem.itemType}
                        menuItem={menuItem}
                        isIced={isIced}
                        onBack={() => navigate(-1)}
                    />
                    <div className="px-4 sm:px-6 pb-32">
                        <MenuInfo
                            name={menuItem.koreanName}
                            englishName={menuItem.englishName}
                            description={menuItem.description}
                            price={menuItem.price}
                            category={menuItem.category}
                            size={menuItem.size}
                        />
                        <TemperaturePanel
                            itemType={menuItem.itemType}
                            initTemperatureOption={initTemperatureOption}
                            isIced={isIced}
                            setIsIced={setIsIced}
                            isCoffee={menuItem.isCoffee}
                        />
                    </div>
                </div>

                <MenuDetailFooter
                    price={menuItem.price}
                    onOrder={() => {
                        navigate(`/order/menu/${menuItem.id}/configurator`, {
                            state: {
                                menuItem: {
                                    ...menuItem,
                                    isIced,
                                },
                            },
                        });
                    }}
                />
            </div>
        </CommonLayout>
    );
}

export default MenuDetail;
