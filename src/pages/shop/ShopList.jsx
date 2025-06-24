import React, { useEffect, useState } from 'react';
import CommonLayout from '../../components/layouts/CommonLayout';
import { CommonHeader } from '../../components/common/customHeader';
import FilterTabs from '../../components/shop/FilterTab';
import ShopListPanel from '../../components/shop/ShopListPanel';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { shopService, sortShops } from '../../services/shopService';

function ShopList() {
    const [selectedFilter, setSelectedFilter] = useState('오름차순');
    const [allShops, setAllShops] = useState([]);
    const [displayedShops, setDisplayedShops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        const sortedShops = sortShops(allShops, filter);
        setDisplayedShops(sortedShops);
    };

    useEffect(() => {
        const sortedShops = sortShops(allShops, selectedFilter);
        setDisplayedShops(sortedShops);
    }, [allShops, selectedFilter]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const shops = await shopService.fetchShops();
                setAllShops(shops);
            } catch (err) {
                console.error('데이터 불러오기 실패:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <CommonLayout className="">
            <CommonHeader onBack={() => window.history.back()} bgColor="white" />
            <FilterTabs
                className="bg-white px-6 pt-2 pb-2 border-b border-gray-200"
                onFilterChange={handleFilterChange}
                activeFilter={selectedFilter}
            />
            <div className="w-full px-6 mx-auto font-sans">
                {isLoading ? (
                    <LoadingSpinner message="매장 정보를 불러오는 중..." />
                ) : (
                    <ShopListPanel shops={displayedShops} />
                )}
            </div>
        </CommonLayout>
    );
}

export default ShopList;
