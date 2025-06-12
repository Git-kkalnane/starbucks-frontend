import React from 'react';

const MenuTab = ({ activeTab, onTabChange, className }) => {
    const tabs = [
        { id: '음료', label: '음료' },
        { id: '푸드', label: '푸드' },
    ];

    return (
        <section className={`flex flex-row justify-start border-b border-gray-200 mb-4 px-5 ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex-1/2 py-4 px-4 text-center font-${activeTab === tab.id ? 'bold' : 'normal'} ${
                        activeTab === tab.id
                            ? 'text-starbucks-green border-b-2 border-starbucks-green'
                            : 'text-disabled-string'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </section>
    );
};

export default MenuTab;
