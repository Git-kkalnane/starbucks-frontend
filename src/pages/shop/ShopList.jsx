import React, { useEffect, useState } from 'react';
import CommonLayout from '../../layouts/CommonLayout';
import { CommonHeader } from '../../components/common/customHeader';
import FilterTabs from '../../components/shop/FilterTab';
import ShopListPanel from '../../components/shop/ShopListPanel';
import { shopService, sortShops } from '../../services/shopService';

function ShopList() {
    const [selectedFilter, setSelectedFilter] = useState('오름차순');
    const [allShops, setAllShops] = useState([]);
    const [displayedShops, setDisplayedShops] = useState([]);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        const sortedShops = sortShops(allShops, filter);
        setDisplayedShops(sortedShops);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const shops = await shopService.fetchShops();
                setAllShops(shops);
                handleFilterChange(selectedFilter);
            } catch (err) {
                console.error('데이터 불러오기 실패:', err);
            }
        }

        fetchData();
    }, []);

    return (
        <CommonLayout className="bg-white">
            <CommonHeader onBack={() => window.history.back()} bgColor="white" />
            <FilterTabs
                className="bg-white px-6 pt-2 pb-2 border-b border-gray-200"
                onFilterChange={handleFilterChange}
                activeFilter={selectedFilter}
            />

            <div className="w-full px-6 mx-auto font-sans">
                <ShopListPanel shops={displayedShops} />
            </div>
        </CommonLayout>
    );
}

export default ShopList;
