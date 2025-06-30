import React, { useState, useEffect, useCallback } from 'react';
import CommonLayout from '../../components/layouts/CommonLayout';
import { ColumnHeader } from '../../components/common/customHeader';
import MenuTab from '../../components/order/MenuTab';
import MenuList from '../../components/order/MenuList';
import OrderNavigationBar from '../../components/order/OrderNavigationBar';
import { OrderQueryService } from '../../services/OrderService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ITEMS_PER_PAGE = 10;

function Order() {
    const [activeTab, setActiveTab] = useState('음료');
    const [allDrinks, setAllDrinks] = useState([]);
    const [allDesserts, setAllDesserts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        drinks: {
            currentPage: 0,
            totalPages: 1,
            hasMore: true,
            isLoading: false,
        },
        desserts: {
            currentPage: 0,
            totalPages: 1,
            hasMore: true,
            isLoading: false,
        },
    });

    const loadInitialData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // 요청 취소를 위한 AbortController 생성
            const controller = new AbortController();
            const { signal } = controller;
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            // 음료와 디저트 데이터를 병렬로 가져오기
            const [drinksResponse, dessertsResponse] = await Promise.all([
                OrderQueryService.fetchDrinkItems(0, ITEMS_PER_PAGE, { signal }),
                OrderQueryService.fetchDessertItems(0, ITEMS_PER_PAGE, { signal })
            ]);

            // 응답을 받았으므로 타임아웃 제거
            clearTimeout(timeoutId);

            // 음료 데이터 처리
            setAllDrinks(drinksResponse.items);
            setPagination(prev => ({
                ...prev,
                drinks: {
                    ...prev.drinks,
                    currentPage: 0,
                    totalPages: drinksResponse.pagination.totalPages,
                    hasMore: 0 < drinksResponse.pagination.totalPages - 1,
                }
            }));

            // 디저트 데이터 처리
            setAllDesserts(dessertsResponse.items);
            setPagination(prev => ({
                ...prev,
                desserts: {
                    ...prev.desserts,
                    currentPage: 0,
                    totalPages: dessertsResponse.pagination.totalPages,
                    hasMore: 0 < dessertsResponse.pagination.totalPages - 1,
                }
            }));
        } catch (err) {
            console.error('Error fetching initial data:', err);
            const errorMessage = err.name === 'AbortError' || err.message.includes('timeout')
                ? '요청 시간이 초과되었습니다. 네트워크 상태를 확인해 주세요.'
                : '메뉴를 불러오는 데 실패했습니다.';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    const loadMoreItems = async () => {
        const stateKey = activeTab === '음료' ? 'drinks' : 'desserts';
        const { currentPage, hasMore, isLoading } = pagination[stateKey];

        if (isLoading || !hasMore) return;

        try {
            setPagination((prev) => ({
                ...prev,
                [stateKey]: {
                    ...prev[stateKey],
                    isLoading: true,
                },
            }));

            const nextPage = currentPage + 1;
            const { items, pagination: paginationData } =
                stateKey === 'drinks'
                    ? await OrderQueryService.fetchDrinkItems(nextPage, ITEMS_PER_PAGE)
                    : await OrderQueryService.fetchDessertItems(nextPage, ITEMS_PER_PAGE);

            if (stateKey === 'drinks') {
                setAllDrinks((prev) => [...prev, ...items]);
            } else {
                setAllDesserts((prev) => [...prev, ...items]);
            }

            setPagination((prev) => ({
                ...prev,
                [stateKey]: {
                    currentPage: nextPage,
                    totalPages: paginationData.totalPages,
                    hasMore: nextPage < paginationData.totalPages - 1,
                    isLoading: false,
                },
            }));
        } catch (err) {
            console.error(`Error loading more ${stateKey}:`, err);
            toast.error(`추가 ${stateKey === 'drinks' ? '음료' : '디저트'}를 불러오는 데 실패했습니다.`);

            setPagination((prev) => ({
                ...prev,
                [stateKey]: {
                    ...prev[stateKey],
                    isLoading: false,
                },
            }));
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const currentItems = activeTab === '음료' ? allDrinks : allDesserts;
    const { hasMore } = activeTab === '음료' ? pagination.drinks : pagination.desserts;

    return (
        <CommonLayout>
            <ColumnHeader title="Order" className="pt-[68px]" />
            <div className="px-5">
                <MenuTab activeTab={activeTab} onTabChange={handleTabChange} />

                {error ? (
                    <div className="text-center py-8">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={loadInitialData}
                            className="px-4 py-2 bg-starbucks-green text-white rounded-md hover:bg-starbucks-dark-green transition-colors"
                        >
                            다시 시도하기
                        </button>
                    </div>
                ) : (
                    <InfiniteScroll
                        dataLength={currentItems.length}
                        next={loadMoreItems}
                        hasMore={hasMore}
                        loader={
                            <div className="flex justify-center p-4">
                                <LoadingSpinner message="로딩 중..." loadingColor="starbucks-green" />
                            </div>
                        }
                        scrollableTarget="scrollableDiv"
                        className="overflow-y-auto"
                        style={{ overflow: 'visible' }}
                    >
                        <MenuList
                            activeTab={activeTab}
                            drinkItems={activeTab === '음료' ? allDrinks : []}
                            dessertItems={activeTab === '디저트' ? allDesserts : []}
                        />
                    </InfiniteScroll>
                )}
            </div>
            <OrderNavigationBar />
        </CommonLayout>
    );
}

export default Order;
