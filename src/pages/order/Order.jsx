import React, { useState, useEffect } from 'react';
import CommonLayout from '../../components/layouts/CommonLayout';
import { ColumnHeader } from '../../components/common/customHeader';
import MenuTab from '../../components/order/MenuTab';
import MenuList from '../../components/order/MenuList';
import OrderNavigationBar from '../../components/order/OrderNavigationBar';
import { OrderQueryService } from '../../services/OrderService';

function Order() {
    const [activeTab, setActiveTab] = useState('음료');
    const [allDrinks, setAllDrinks] = useState([]);
    const [allDesserts, setAllDesserts] = useState([]);

    const [pagination, setPagination] = useState({
        totalCount: 0,
        currentPage: 0,
        totalPages: 0,
        pageSize: 10
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const { items, pagination: paginationData } = await OrderQueryService.fetchDrinkItems();
                console.log('Drinks data:', items);
                console.log('Pagination:', paginationData);
                setAllDrinks(items);
                setPagination(paginationData);
            } catch (err) {
                console.error('음료 데이터 불러오기 실패:', err);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchDessertData() {
            try {
                const { items } = await OrderQueryService.fetchDessertItems();
                console.log('Desserts data:', items);
                setAllDesserts(items);
            } catch (err) {
                console.error('데이터 불러오기 실패:', err);
            }
        }

        fetchDessertData();
    }, []);

    return (
        <CommonLayout>
            <ColumnHeader title="Order" className="pt-[68px]" />
            <div className="px-5 ">
                <MenuTab activeTab={activeTab} onTabChange={setActiveTab} />
                <MenuList activeTab={activeTab} drinkItems={allDrinks} dessertItems={allDesserts} />
            </div>
            <OrderNavigationBar />
        </CommonLayout>
    );
}

export default Order;
