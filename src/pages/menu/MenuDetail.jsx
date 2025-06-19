import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CommonLayout from '../../layouts/CommonLayout';
import MenuHeader from '../../components/menu/MenuHeader';
import MenuInfo from '../../components/menu/MenuInfo';
import OrderActionBtn from '../../components/menu/MenuAction';
import TemperatureToggle from '../../components/menu/TemperatureToggle';

function MenuDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isIced, setIsIced] = useState(true);
    const [menuItem, setMenuItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Get menu item from navigation state or fetch it
    useEffect(() => {
        if (location.state?.menuItem) {
            console.log('Menu item received:', location.state.menuItem);
            const item = location.state.menuItem;
            setMenuItem(item);
            // Set initial temperature based on menu item's isIce property if it exists
            if (item.isIce !== undefined) {
                setIsIced(item.isIce);
            }
            setIsLoading(false);
        } else {
            // Fallback: If no menuItem in state, use a default item
            // In a real app, you might want to fetch the item using the ID from the URL
            console.warn('No menu item data received, using fallback data');
            const defaultItem = {
                id: 0,
                koreanName: '플랫 화이트',
                englishName: 'Flat White',
                category: '에스프레소',
                price: 5800,
                description: '벨벳 같은 미세 거품과 진한 에스프레소',
                isIce: false,
                isCoffee: true,
                size: 'Short/Tall/Grande/Venti',
                options: ['카라멜 시럽'],
                img: {
                    hot: 'https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000005178]_20240326103727795.jpg',
                    cold: 'https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000005181]_20240326103832835.jpg',
                },
            };
            setMenuItem(defaultItem);
            setIsIced(defaultItem.isIce);
            setIsLoading(false);
        }
    }, [location.state]);

    if (isLoading || !menuItem) {
        return (
            <CommonLayout>
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-starbucks-green"></div>
                </div>
            </CommonLayout>
        );
    }

    return (
        <CommonLayout className="flex flex-col min-h-screen">
            {/* Main content area with minimum height and flexible growth */}
            <div className="flex-1 min-h-0 flex flex-col">
                <div className="overflow-y-auto flex-1">
                    <MenuHeader
                        imageUrl={isIced ? menuItem.img?.cold || '' : menuItem.img?.hot || ''}
                        name={menuItem.koreanName}
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
                        <div className="mt-4 mb-24">
                            <TemperatureToggle
                                isIced={isIced}
                                setIsIced={setIsIced}
                                disabled={!menuItem.isCoffee}
                                className={!menuItem.isCoffee ? 'opacity-70' : ''}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom action button container */}
                <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
                    <div className="max-w-md mx-auto w-full">
                        <OrderActionBtn
                            price={menuItem.price}
                            onOrder={() => {
                                navigate(`/order/menu/${menuItem.id}/configurator`, {
                                    state: {
                                        menuItem: {
                                            ...menuItem,
                                            isIced,
                                        }
                                    }
                                });
                            }}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}

export default MenuDetail;
