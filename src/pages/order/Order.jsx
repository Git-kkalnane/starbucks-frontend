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
            isLoading: false
        },
        desserts: {
            currentPage: 0,
            totalPages: 1,
            hasMore: true,
            isLoading: false
        }
    });

    const fetchItems = useCallback(async (type, page = 0, append = false) => {
        const isDrink = type === '음료';
        const stateKey = isDrink ? 'drinks' : 'desserts';
        
        // Prevent multiple simultaneous loads
        if (pagination[stateKey].isLoading) return;
        
        try {
            setPagination(prev => ({
                ...prev,
                [stateKey]: {
                    ...prev[stateKey],
                    isLoading: true
                }
            }));
            
            const { items, pagination: paginationData } = isDrink
                ? await OrderQueryService.fetchDrinkItems(page, ITEMS_PER_PAGE, { signal: AbortSignal.timeout(10000) })
                : await OrderQueryService.fetchDessertItems(page, ITEMS_PER_PAGE, { signal: AbortSignal.timeout(10000) });
            
            setPagination(prev => ({
                ...prev,
                [stateKey]: {
                    currentPage: page,
                    totalPages: paginationData.totalPages,
                    hasMore: page < paginationData.totalPages - 1,
                    isLoading: false
                }
            }));
            
            if (isDrink) {
                setAllDrinks(prev => append ? [...prev, ...items] : items);
            } else {
                setAllDesserts(prev => append ? [...prev, ...items] : items);
            }
            
            if (error) setError(null);
        } catch (err) {
            console.error(`Error fetching ${type} items:`, err);
            const errorMessage = err.message.includes('timeout') 
                ? '요청 시간이 초과되었습니다. 네트워크 상태를 확인해 주세요.'
                : `${type} 목록을 불러오는 데 실패했습니다.`;
                
            toast.error(errorMessage);
            setError(errorMessage);
            
            setPagination(prev => ({
                ...prev,
                [stateKey]: {
                    ...prev[stateKey],
                    isLoading: false
                }
            }));
        } finally {
            setIsLoading(false);
        }
    }, [error]);

    // Initial load
    useEffect(() => {
        fetchItems('음료');
        fetchItems('디저트');
    }, []);

    const loadMoreItems = () => {
        const stateKey = activeTab === '음료' ? 'drinks' : 'desserts';
        const { currentPage, hasMore, isLoading } = pagination[stateKey];
        
        if (!isLoading && hasMore) {
            const nextPage = currentPage + 1;
            fetchItems(activeTab, nextPage, true);
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
                            onClick={() => fetchItems(activeTab, 0, false)}
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
                            drinkItems={activeTab === '음료' ? currentItems : []} 
                            dessertItems={activeTab === '디저트' ? currentItems : []} 
                        />
                    </InfiniteScroll>
                )}
            </div>
            <OrderNavigationBar />
        </CommonLayout>
    );
}

export default Order;
