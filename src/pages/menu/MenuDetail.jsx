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
import { useUser } from '../../contexts/UserContext';
import ConfirmLoginModal from '../../components/common/ConfirmationModal';

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
    const { state, actions } = useUser();

    const { id: itemId } = useParams();
    const [isIced, setIsIced] = useState(true);
    const [menuItem, setMenuItem] = useState(null);
    const [showStoreSelectModal, setShowStoreSelectModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [initTemperatureOption, setInitTemperatureOption] = useState('');
    const itemType = useLocation().state.itemType;

    useEffect(() => {
        if (initTemperatureOption === TemperatureDisplayOption.ICE_ONLY) {
            setIsIced(true);
        } else if (initTemperatureOption === TemperatureDisplayOption.HOT_ONLY) {
            setIsIced(false);
        }
    }, [initTemperatureOption]);
    // isIced 상태가 변경될 때 temperatureOption 업데이트
    useEffect(() => {
        if (menuItem) {
            const temperatureOption = isIced ? TemperatureDisplayOption.ICE_ONLY : TemperatureDisplayOption.HOT_ONLY;
            setMenuItem((prev) => ({
                ...prev,
                temperatureOption,
                isIce: isIced,
            }));
        }
    }, [isIced]);

    // URL의 itemId를 사용하여 메뉴 아이템 가져오기
    useEffect(() => {
        const abortController = new AbortController();

        const fetchMenuItem = async () => {
            if (!itemId) {
                console.warn('No menu item ID provided, using fallback data');
                setMenuItem(defaultItem);
                setIsIced(defaultItem.isIce);
                setIsLoading(false);
                return;
            }

            try {
                console.log(`Fetching item ${itemId} of type ${itemType}`);
                const itemData = await OrderQueryService.fetchItemDetail(itemId, itemType, {
                    signal: abortController.signal,
                });

                if (itemData) {
                    console.log('Fetched menu item:', itemData);

                    // 사용 가능한 옵션을 기반으로 초기 온도 상태 결정
                    const hasIceOption = itemData.temperatureOptions?.includes('ICE');
                    const hasHotOption = itemData.temperatureOptions?.includes('HOT');

                    let initialIsIced = hasIceOption;

                    // 두 옵션이 모두 사용 가능한 경우, 백엔드의 기본값을 사용하거나 기본값을 아이스로 설정
                    if (hasIceOption && hasHotOption) {
                        initialIsIced = itemData.defaultTemperature === TemperatureDisplayOption.ICE_ONLY;
                    }

                    const newItem = {
                        ...itemData,
                        temperatureOption:
                            itemData.defaultTemperature ||
                            (hasIceOption ? TemperatureDisplayOption.ICE_ONLY : TemperatureDisplayOption.HOT_ONLY),
                        isIce: initialIsIced,
                    };

                    setMenuItem(newItem);
                    setIsIced(initialIsIced);
                    setInitTemperatureOption(newItem.temperatureOption);
                } else {
                    throw new Error('No data received from server');
                }
            } catch (err) {
                if (abortController.signal.aborted) {
                    console.log('Fetch aborted');
                    return;
                }
                console.error('Error fetching menu item:', err);
                setError('메뉴 정보를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.');
                setMenuItem(defaultItem);
                setIsIced(defaultItem.isIce);
            } finally {
                if (!abortController.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        fetchMenuItem();

        return () => {
            abortController.abort();
        };
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
            {/* 최소 높이와 유연한 성장을 가진 메인 콘텐츠 영역 */}
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

                {/* 하단 액션 버튼 컨테이너 */}
                <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
                    <div className="max-w-md mx-auto w-full">
                        <OrderActionBtn
                            price={menuItem.price}
                            onOrder={() => {
                                if (!state.selectedStore) {
                                    setShowStoreSelectModal(true);
                                    return;
                                }
                                navigate(`/order/menu/${menuItem.id}/configurator`, {
                                    state: {
                                        menuItem: {
                                            ...menuItem,
                                        },
                                        img:
                                            menuItem.img.defaultUrl ||
                                            (isIced ? menuItem.img?.ice || '' : menuItem.img?.hot || ''),
                                    },
                                });
                            }}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* 매장 선택 안내 모달 */}
            <ConfirmLoginModal
                open={showStoreSelectModal}
                title="매장을 선택해주세요"
                subtitle="주문을 하시려면 먼저 매장을 선택해주세요."
                onConfirm={() => {
                    setShowStoreSelectModal(false);
                    navigate('/order/shop');
                }}
                onCancel={() => setShowStoreSelectModal(false)}
            />
        </CommonLayout>
    );
}

export default MenuDetail;
