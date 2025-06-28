import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layouts/CommonLayout';
import MenuHeader from '../../components/menu/menu_detail/MenuHeader';
import MenuInfo from '../../components/menu/menu_detail/MenuInfo';
import OrderActionBtn from '../../components/menu/menu_detail/MenuDetailFooter';
import TemperatureToggle from '../../components/menu/menu_detail/TemperatureToggle';
import TemperatureDisplay from '../../components/menu/menu_detail/TemperatureDisplay';
import { OrderQueryService } from '../../services/OrderService';
import { TemperatureDisplayOption } from '../../_utils/constants/beverageOptions';
import ItemType from '../../_utils/constants/itemType';

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
    const { id: itemId } = useParams();
    const [isIced, setIsIced] = useState(true);
    const [menuItem, setMenuItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [initTemperatureOption, setInitTemperatureOption] = useState('');
    const itemType = useLocation().state.itemType;

    // Update temperatureOption when isIced changes
    useEffect(() => {
        if (menuItem) {
            const temperatureOption = isIced ? 'iced' : 'hot';
            setMenuItem((prev) => ({
                ...prev,
                temperatureOption,
                isIce: isIced,
            }));
        }
    }, [isIced]);

    // Fetch menu item using the itemId from URL
    useEffect(() => {
        const fetchMenuItem = async () => {
            if (!itemId) {
                console.warn('No menu item ID provided, using fallback data');
                setMenuItem(defaultItem);
                setIsIced(defaultItem.isIce);
                setIsLoading(false);
                return;
            }

            try {
                console.log(`itemType: ${itemType}`);
                const itemData = await OrderQueryService.fetchItemDetail(itemId, itemType);

                if (itemData) {
                    console.log('Fetched menu item:', itemData);
                    const newItem = {
                        ...itemData,

                        temperatureOption: itemData.temperatureOptions?.includes('ICE') ? 'iced' : 'hot',
                        isIce: itemData.temperatureOptions?.includes('ICE'),
                    };

                    setMenuItem(newItem);
                    setIsIced(newItem.isIce);
                    console.log('newItem: ->', newItem);
                    setInitTemperatureOption(newItem.defaultTemperature);
                } else {
                    throw new Error('No data received from server');
                }
            } catch (err) {
                console.error('Error fetching menu item:', err);
                setError('메뉴 정보를 불러오는 데 실패했습니다.');
                // Fallback to default item
                setMenuItem(defaultItem);
                setIsIced(defaultItem.isIce);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMenuItem();
    }, [itemId]);
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
                        imageUrl={
                            itemType === ItemType.BEVERAGE
                                ? initTemperatureOption === TemperatureDisplayOption.ICE_ONLY
                                    ? menuItem.img?.ice || ''
                                    : initTemperatureOption === TemperatureDisplayOption.HOT_ONLY
                                    ? menuItem.img?.hot || ''
                                    : isIced
                                    ? menuItem.img?.ice || ''
                                    : menuItem.img?.hot || ''
                                : menuItem.img.defaultUrl || ''
                        }
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
                        {itemType !== ItemType.DESSERT && (
                            <div className="mt-4 mb-24">
                                {initTemperatureOption === TemperatureDisplayOption.HOT_ONLY ||
                                initTemperatureOption === TemperatureDisplayOption.ICE_ONLY ? (
                                    <TemperatureDisplay
                                        isIced={initTemperatureOption === TemperatureDisplayOption.ICE_ONLY}
                                        isActive={true}
                                        className="max-w-xs mx-auto"
                                    />
                                ) : (
                                    <TemperatureToggle
                                        isIced={isIced}
                                        setIsIced={setIsIced}
                                        disabled={!menuItem.isCoffee}
                                        className={!menuItem.isCoffee ? 'opacity-70' : ''}
                                    />
                                )}
                            </div>
                        )}
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
                                        },
                                        img: isIced ? menuItem.img?.cold || '' : menuItem.img?.hot || '',
                                    },
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
