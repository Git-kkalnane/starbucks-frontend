import React, { useState, useEffect } from 'react';
import CommonLayout from '../layouts/CommonLayout';
import { ColumnHeader } from '../components/common/customHeader';
import MenuTab from '../components/order/MenuTab';
import MenuList from '../components/order/MenuList';
import OrderNavigationBar from '../components/order/OrderNavigationBar';
import { OrderQueryService } from '../services/OrderService';

function Order() {
    const [activeTab, setActiveTab] = useState('음료');
    const [allDrinks, setAllDrinks] = useState([]);
    const [allDesserts, setAllDesserts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const drinks = await OrderQueryService.fetchDrinkItems();
                console.log(drinks[0]);
                setAllDrinks(drinks);
            } catch (err) {
                console.error('데이터 불러오기 실패:', err);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchDessertData() {
            try {
                const desserts = await OrderQueryService.fetchDessertItems();
                console.log(desserts[0]);
                setAllDesserts(desserts);
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
            <OrderNavigationBar itemCount={5} />
        </CommonLayout>
    );
}

export default Order;
