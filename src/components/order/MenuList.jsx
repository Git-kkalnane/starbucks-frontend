import React from 'react';

const MenuItem = ({ item, className }) => {
    return (
        <div className={`flex py-2 border-b border-gray-100 ${className}`}>
            <div className="w-24 h-24 rounded-full bg-gray-100 mr-4 flex-shrink-0">
                <img
                    src={typeof item.img === 'string' ? item.img : item.img?.hot || item.img?.cold || ''}
                    alt={item.koreanName}
                    className="w-24 h-24 rounded-full mr-4 flex-shrink-0"
                />
            </div>
            <div className="flex-1">
                <div className="font-medium mt-4">{item.koreanName}</div>
                <div className="text-gray-600 text-sm mb-1">{item.englishName}</div>
                <div className="font-medium text-gray-800">{item.price.toLocaleString()}원</div>
            </div>
        </div>
    );
};

const MenuList = ({ activeTab, drinkItems, dessertItems, className }) => {
    return (
        <section className={`px-1 ${className}`}>
            <div className="space-y-4 overflow-y-auto h-[calc(100vh-220px)]">
                {activeTab === '음료' && drinkItems.map((item) => <MenuItem key={item.id} item={item} />)}
                {activeTab === '푸드' && dessertItems.map((item) => <MenuItem key={item.id} item={item} />)}
            </div>
        </section>
    );
};

export default MenuList;
