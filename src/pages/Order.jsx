import React, { useState, useEffect } from 'react';
import CommonLayout from '../layouts/CommonLayout';
import { ColumnHeader } from '../components/common/customHeader';
import MenuTab from '../components/order/MenuTab';
import MenuList from '../components/order/MenuList';
import OrderNavigationBar from '../components/order/OrderNavigationBar';
import { getDrinkItems, getFoodItems } from '../services/OrderService';

function Order() {
    const [menuData, setMenuData] = useState({
        drinkItems: [],
        foodItems: [],
    });

    useEffect(() => {
        const loadMenuData = () => {
            setMenuData({
                drinkItems: getDrinkItems(),
                foodItems: getFoodItems(),
            });
        };

        loadMenuData();
    }, []);

    const { drinkItems, foodItems } = menuData;
    const [activeTab, setActiveTab] = useState('음료');

    return (
        <CommonLayout>
            <ColumnHeader title="Order" className="pt-[68px]" />
            <div className="px-5 ">
                <MenuTab activeTab={activeTab} onTabChange={setActiveTab} />
                <MenuList activeTab={activeTab} drinkItems={drinkItems} foodItems={foodItems} />
            </div>
            <OrderNavigationBar itemCount={5} />
        </CommonLayout>
    );
}

export default Order;
